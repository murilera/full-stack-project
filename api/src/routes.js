import Router from '@koa/router'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const router = new Router()

const prisma = new PrismaClient()

router.get('/tweets', async (ctx) => {
  const [, token] = ctx.request.headers?.authorization?.split(' ') || []

  if (!token) {
    ctx.status = 401
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const tweets = await prisma.tweet.findMany({
      where: { userId: payload.sub }
    })
    ctx.body = tweets
  } catch (error) {
    console.log('🚀 ~ file: routes.js ~ line 21 ~ router.get ~ error', error)
    ctx.status = 401
  }
})

router.post('/tweets', async (ctx) => {
  const [, token] = ctx.request.headers?.authorization?.split(' ') || []

  if (!token) {
    ctx.status = 401
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { text } = ctx.request.body
    const tweet = await prisma.tweet.create({
      data: {
        userId: payload.sub,
        text
      }
    })

    ctx.body = tweet
  } catch (error) {
    console.log('🚀 ~ file: routes.js ~ line 26 ~ router.post ~ error', error)
    ctx.status = 401
  }
})

router.post('/signup', async (ctx) => {
  const { name, username, email, password } = ctx.request.body
  const saltRounds = 10
  const passwordHash = bcrypt.hashSync(password.toString(), saltRounds)

  // const { password, ...user } = await prisma.user.create({
  //   data: {
  //     name,
  //     username,
  //     email,
  //     password: passwordHash
  //   }
  // })
  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: passwordHash
      }
    })

    delete user.password

    ctx.body = user
  } catch (error) {
    console.log('🚀 ~ file: routes.js ~ line 69 ~ router.post ~ error', error)

    if (error.meta && !error.meta.target) {
      ctx.status = 422
      ctx.body = 'Email or username already exists.'
      return
    }
    ctx.status = 500
    ctx.body = 'Internal error'
  }
})

router.get('/login', async (ctx) => {
  // const [type, token] = ctx.request.headers.authorization.split(' ')
  const [, token] = ctx.request.headers.authorization.split(' ')
  const [email, plainTextPassword] = Buffer.from(token, 'base64')
    .toString()
    .split(':')

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    ctx.status = 404
    return
  }

  const passwordMatch = bcrypt.compareSync(plainTextPassword, user.password)

  if (passwordMatch) {
    const accessToken = jwt.sign(
      {
        sub: user.id
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    delete user.password
    ctx.body = {
      ...user,
      accessToken
    }
    return
  }

  ctx.status = 404
})
