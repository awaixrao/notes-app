import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const ctx = useContext(AuthContext);


  const onSubmit = (data) => {
    // calling login function
    ctx.loginUser(data);
  }

  return (
    <div id='login' className='login-page'>
      <div className='login-form p-10'>
        <h1 className='text-center text-3xl font-bold my-3 mb-10'>login form</h1>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="mb-10">
            <input type='text' {...register('email', {
              required: {
                value: true,
                message: "Username name field is required."
              }
            })} className='w-full p-5 rounded-md bg-transparent border text-white' placeholder='Email address' />

            {
              errors.email && <p className="text-red-600 my-3 bg-gray-50 p-2">
                <span>{errors.email.message}</span>
              </p>
            }
          </div>

          <input type='password' {...register('password', {
            required: {
              value: true,
              message: "Password field is required"
            }
          })} placeholder='Password' className='w-full p-5 mb-3 rounded-md bg-transparent border text-white' />


          {
            errors.password && <p className="text-red-600 my-3 bg-gray-50 p-2">
              <span>{errors.password.message}</span>
            </p>
          }

          <button className='w-full p-5 mb-3 rounded-md bg-gray-900 text-white border-0 text-xl mt-3 hover:bg-gray-800'>Login to noty</button>
          {
            ctx.error && <p className="text-red-600 my-3 bg-gray-50 p-2">
              <span>{ctx.error}</span>
            </p>
          }
       
        </form> 

       <Link  className="text-center" to='/register'>
        <h5 className="text-center">Sign Up</h5>
          </Link>


      </div>
    </div>
  )
}

export default Login