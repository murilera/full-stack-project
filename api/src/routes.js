import Router from '@koa/router'
import { PrismaClient } from '@prisma/client'

export const router = new Router()

const prisma = new PrismaClient()

router.get('/tweets', async (ctx) => {
  const tweets = await prisma.tweet.findMany()
  ctx.body = tweets
})

router.post('/tweets', async (ctx) => {
  const userId = 'cl4eol3o10014zwullkbh7mq3'

  const tweet = {
    userId,
    text: ctx.request.body.text
  }

  const doc = await prisma.tweet.create({
    data: tweet
  })

  ctx.body = doc
})
