import { FormikConsumer, FormikContext, useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

const Input = (props) => (
  <input
    {...props}
    className='w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum'
  />
)

const toastConfig = {
  position: 'bottom-center',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined
}

const validationSchema = yup.object({
  email: yup.string().required('Insert email').email('Invalid email'),
  password: yup.string().required('Insert password')
})

export const Login = ({ signInUser }) => {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    onSubmit: async (values) => {
      try {
        const res = await axios.get('http://localhost:7777/login', {
          auth: {
            username: values.email,
            password: values.password
          }
        })

        toast.success('Logged in!', { autoClose: 500, ...toastConfig })

        setLoading(true)
        setTimeout(() => {
          signInUser(res.data)
          setLoading(false)
        }, 1500)
      } catch (error) {
        console.error(error.message)
        toast.error('Invalid credentials!', { autoClose: 1000, ...toastConfig })
      }
    },
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    validateOnMount: true
  })
  return (
    <>
      <div className='h-full flex flex-col justify-center p-12 space-y-6'>
        <h1 className='text-3xl'>Acesse sua conta</h1>

        <form className='space-y-6' onSubmit={formik.handleSubmit}>
          <div className='space-y-2'>
            <Input
              type='text'
              name='email'
              placeholder='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting || loading}
            />
            {formik.touched.email && formik.errors.email && (
              <span className='text-red-500 text-sm mt-2'>
                {formik.errors.email}
              </span>
            )}
          </div>

          <div className='space-y-2'>
            <Input
              type='password'
              name='password'
              placeholder='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting || loading}
            />
            {formik.touched.password && formik.errors.password && (
              <span className='text-red-500 text-sm'>
                {formik.errors.password}
              </span>
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg'
            disabled={formik.isSubmitting || !formik.isValid || loading}
          >
            Entrar
          </button>
        </form>

        <span className='text-sm text-silver text-center'>
          Não tem conta?{' '}
          <a className='text-birdBlue' href=''>
            Inscreva-se aqui
          </a>
        </span>
      </div>
      <ToastContainer />
    </>
  )
}
