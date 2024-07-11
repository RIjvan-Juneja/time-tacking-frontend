import React from 'react'
import { Button, InputField, SelectBox } from '../../common/components/Forms/FormFields'

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
        <div className="mt-8 sm:mx-auto w-[57rem] ">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form>
              <div className='grid grid-cols-2 gap-4 mt-3'>
                <InputField id='first_name' name='first_name' label='First Name' type='text' error={``} />
                <InputField id='last_name' name='last_name' label='Last Name' type='text' error={``} />
              </div>

              <div className='grid grid-cols-3 gap-4 mt-3'>
                <InputField id='email' name='email' label='Email' type='email' error={``} />
                <InputField id='mobile_number' name='mobile_number' label='Mobile Number' type='number' error={``} />
                <SelectBox id='gender' name='gender' label='Gender' options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' }
                ]} />
              </div>

              <div className='grid grid-cols-2 gap-4 mt-3'>
                <InputField id='email' name='email' label='Password' type='password' error={``} />
                <InputField id='mobile_number' name='mobile_number' label='Confirm Password' type='password' error={``} />
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <Button lable='Sign Up' type="submit" id='signUp' customClass='w-full' />
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