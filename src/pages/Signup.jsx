import React from 'react'
import SignupForm from '../components/backendForms/SignupForm';
import { Tooltip } from 'react-tooltip'
import infoIcon from '../assets/info-icon.svg';
import '../App.css'

const Signup = () => {
  return (
    <>
      <div className='mx-auto container h-screen flex flex-col justify-center items-center lg:max-w-screen-xl'>
        <div className='background-image'></div>
          <h2 className='text-4xl font-bold mb-4'>Sign Up</h2>
          <a data-tooltip-id='username-password-tooltip' className='tooltip-icon'><img src={infoIcon} alt="tool tip icon" /></a>
          <Tooltip id='username-password-tooltip'>
            <div className='w-64'>
              <h3 className='font-bold text-xl'>Username:</h3>
              <p>
                Username must be 4-16 characters long and can only contain letters, numbers, and underscores.
              </p>
              <h3 className='font-bold text-xl'>Password:</h3>
              <p>
                Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character.
              </p>
            </div>
          </Tooltip>
          <SignupForm />
      </div>
    </>
  )
}

export default Signup