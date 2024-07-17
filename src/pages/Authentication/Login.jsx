import { Link, useNavigate } from "react-router-dom"
import { Button, InputField } from "../../common/components/Forms/FormFields"
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/UserSlice";

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
  password: z.string().min(5, { message: 'Password should be at least 5 characters long' }),
})

const Login = () => {

  const dispatch = useDispatch();

  const { loading, error, fetchData, sendData } = useFetch();
  const navigate = useNavigate();
  const [unauthorized, setUnauthorized] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setUnauthorized(false);
      const response = await sendData('/auth/api/login', JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.response_type !== 'success') {
        setUnauthorized(response.message)
      } else {
        setUnauthorized(false)
        localStorage.setItem('token', response.data)
        dispatch(loginSuccess(response.data));             

        // Redirect to dashboard
        if(response.data.role === 'admin'){
          navigate('/admin/dashboard')
        } else {
          navigate('/user/task/list')
        }

      }
    } catch (error) {
      Swal.fire({
        title: "Unexpected Error",
        text: error,
        icon: "error"
      });
    }

  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900" >
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            <Link to='/registation' className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              create a new acccount
            </Link>
          </p>
        </div>

        {/* id, name, label, type, value, placeholder, error, onChange */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form>
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

              <div className="mt-6">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      ref={null}
                      id="password"
                      name="password"
                      label="Password *"
                      type="password"
                      error={errors.password?.message}
                    />
                  )} />
              </div>

              {unauthorized && (<p className={`text-red-500 text-sm ${unauthorized ? ' ' : 'invisible'}`}>{(unauthorized) ? unauthorized : "."}</p>)}

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm leading-5">
                  <a href="#" className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <Button lable='Sign in' type="button" id='signUp' onClick={handleSubmit(onSubmit)} customClass='w-full' />
                </span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login

