import { Link, useNavigate } from "react-router-dom"
import { Button, InputField } from "../../common/components/Forms/FormFields"
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/UserSlice";

const sendOtpSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
})

const submitSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
  otp: z.string().min(5, { message: 'Please Enter valid OTP' }),
  password: z.string().min(5, { message: 'Password should be at least 5 characters long' }),
})

const ForgotPassword = () => {

  const { sendData } = useFetch();
  const [error, setError] = useState(false);

  const [timer, setTimer] = useState(0);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
   console.log(data);

  }

  const handleOtpSend = async (data) => {
    setTimer(59)
    const validatedData = await submitSchema.parseAsync(data);
    console.log(validatedData.email);

  } 

  useEffect(()=>{
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  },[timer])
  
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900" >
            Forgot Password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form>

              <div className="flex">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      ref={null}
                      id="email"
                      name="email"
                      label="Email *"
                      type="email"
                      error={errors.email?.message}
                    />
                  )} />
                  <Button lable={(timer)? timer : 'GET OTP'} onClick={handleOtpSend} isDisabled={timer} type="button" customClass='h-[43px] w-[130px] ml-3 mt-7' />
              </div>

              <div className="">
                <Controller
                  name="otp"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      ref={null}
                      id="otp"
                      name="otp"
                      label="OTP *"
                      type="otp"
                      error={errors.otp?.message}
                    />
                  )} />
              </div>

              <div className="">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      ref={null}
                      id="password"
                      name="password"
                      label="New Password *"
                      type="password"
                      error={errors.password?.message}
                    />
                  )} />
              </div>

              {error && (<p className={`text-red-500 text-sm ${error ? ' ' : 'invisible'}`}>{(error) ? error : "."}</p>)}

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm leading-5">
                  <a href="#" className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <Button lable='Submit' type="button" id='submit' onClick={handleSubmit(onSubmit)} customClass='w-full' />
                </span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword

