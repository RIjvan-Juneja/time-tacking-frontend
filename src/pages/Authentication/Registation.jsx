import React from 'react'
import { InputField } from '../../common/components/Forms/FormFields'

const Registation = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900" >
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            Or
            <a href="#"
              className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              create a new acccount
            </a>
          </p>
        </div>

        {/* id, name, label, type, value, placeholder, error, onChange */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form>
              <div>
                <InputField id='email' name='name' label='Email' type='email' error={``} placeholder='Enter Your Email' />
              </div>

              <div className="mt-6">
                <InputField id='password' name='password' label='Password' type='password' error={``} placeholder='Enter Password' />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm leading-5">
                  <a href="#" className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    Sign in
                  </button>
                </span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Registation