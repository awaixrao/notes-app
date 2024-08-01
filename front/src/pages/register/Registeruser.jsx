import React, { useContext } from 'react'
import { useForm } from 'react-hook-form' // Import useForm from react-hook-form
import { AuthContext } from '../../context/AuthContext'

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
const ctx = useContext(AuthContext)

  const onSubmit = (data) => {
    ctx.registerUser(data)
  }

  return (
    <div id='login' className='login-page'>
      <div className='login-form p-10'>
        <h1 className='text-center text-3xl font-bold my-3 mb-10'>Signup Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

        <div className="mb-5">
            <input
              type='text'
              {...register('name', {
                required: {
                  value: true,
                  message: "Name field is required."
                }
              })}
              className='w-full p-3 rounded-md bg-transparent border text-white'
              placeholder='Enter Your Name..'
            />
            {errors.email && (
              <p className="text-red-600 my-3 bg-gray-50 p-2">
                <span>{errors.name.message}</span>
              </p>
            )}
          </div>




          <div className="mb-5">
            <input
              type='text'
              {...register('email', {
                required: {
                  value: true,
                  message: "Email field is required."
                }
              })}
              className='w-full p-3 rounded-md bg-transparent border text-white'
              placeholder='Email address'
            />
            {errors.email && (
              <p className="text-red-600 my-3 bg-gray-50 p-2">
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          <input
            type='password'
            {...register('password', {
              required: {
                value: true,
                message: "Password field is required"
              }
            })}
            placeholder='Password'
            className='w-full p-3 mb-2 rounded-md bg-transparent border text-white'
          />
          {errors.password && (
            <p className="text-red-600 my-3 bg-gray-50 p-2">
              <span>{errors.password.message}</span>
            </p>
          )}

          <button
            type='submit'
            className='w-full p-4  rounded-md bg-gray-900 text-white border-0 text-xl mt-3 hover:bg-gray-800'
          >
            Signup to Noty
          </button>

          {
            ctx.error && <p className="text-red-600 my-3 bg-gray-50 p-2">
              <span>{ctx.error}</span>
            </p>
          }

        
        </form>
      </div>
    </div>
  )
}

export default Register
