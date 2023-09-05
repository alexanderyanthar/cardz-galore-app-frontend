import React from 'react'
import LoginForm from '../components/backendForms/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Login = () => {
  return (
    <>
      <div className='container w-full my-0 mx-auto h-screen flex flex-col justify-center items-center'>
        <div className='background-image-login'></div>
          <h2 className='text-4xl font-bold mb-4'>Log In</h2>
          <LoginForm />
          <p className='my-8'>Don't have an account. <a className='font-bold text-xl transition-colors hover:text-blue-600' href="/signup">Sign up</a></p>
          <ToastContainer />
      </div>
    </>
  )
}

export default Login