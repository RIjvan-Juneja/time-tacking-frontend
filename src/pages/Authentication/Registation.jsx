import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputField, SelectBox } from '../../common/components/Forms/FormFields'
import { Link } from 'react-router-dom';

// Zod schema for form validation
const taskSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email name is required' }).email({ message: 'Invalid email format' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  mobile_number: z.string().min(10, { message: 'Mobile number should be 10 digits' }).max(10, { message: 'Mobile number should be 10 digits' }).regex(new RegExp(/^[0-9]+$/), 'Please Enter Only Number'),
  password: z.string().min(5, { message: 'Password should be at least 5 characters long' }),
  confirm_password: z.string().min(5, { message: 'Password should be at least 5 characters long' }),
}).refine((data) => data.password == data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"], // path of error
})

const Registation = () => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      mobile_number: '',
      password: '',
      confirm_password: '',
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900" >
            Create New account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            <Link to='/login' className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              already have account ?
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto w-[57rem] ">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-4 mt-3'>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      ref={null}
                      id="first_name"
                      name="first_name"
                      label="First Name *"
                      type="text"
                      error={errors.first_name?.message}
                    />
                  )} />

                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      ref={null}
                      id="last_name"
                      name="last_name"
                      label="Last Name *"
                      type="text"
                      error={errors.last_name?.message}
                    />
                  )} />

              </div>

              <div className='grid grid-cols-3 gap-4 mt-3'>
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

                <Controller
                  name="mobile_number"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      ref={null}
                      id="mobile_number"
                      name="mobile_number"
                      label="Mobile Number *"
                      type="text"
                      error={errors.mobile_number?.message}
                    />
                  )} />

                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      {...field}
                      ref={null}
                      id="gender"
                      name="gender"
                      label="Gender *"
                      error={errors.gender?.message}
                      options={[
                        { label: 'select gender', value: '' },
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' }
                      ]}
                    />
                  )} />
              </div>

              <div className='grid grid-cols-2 gap-4 mt-3'>

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

                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      ref={null}
                      id="confirm_password"
                      name="confirm_password"
                      label="Confirm Password *"
                      type="password"
                      error={errors.confirm_password?.message}
                    />
                  )} />

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