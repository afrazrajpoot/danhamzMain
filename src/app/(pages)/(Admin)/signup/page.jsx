'use client'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { signup } from '@/app/Data';
import Layout from '@/app/Component/Layout';
import { useSignUpUserMutation } from '@/app/store/storeApi';


const Register = () => {
    const [signUpUser] = useSignUpUserMutation();
    const [userInfo, setUserInfo] = useState({username: "", email: "", password: ""})

    const {push:navigate} = useRouter()
    const { handleSubmit, setValue, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        })
        setValue(name, value);
    };
    const showToast = (message, type) => {
        toast[type](message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();      
        try {
          const response = await signUpUser(data);
          if(response?.data){
            showToast('Successfully Registered', 'success');
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          }
        } catch (error) {
        //   console.error('Error during sign-up:', error);
          showToast('An unexpected error occurred. Please try again.', 'error');
        }
        reset();
      };
    return (
        <div>
            <Layout>
            <main className='bg-gray-100 w-full'>
                <ToastContainer />
                <form onSubmit={handleSubmit(onSubmit)} className="">
                            <section className="col-center p-3vw w-full">
                            {signup?.map((form, index) => (
                                <div key={index} className='w-full  p-0.5vw max-w-[30vw]'>
                                    <label className='text-vw font-medium text-black'>{form?.label}</label> <br />
                                    <Controller
                                        name={form?.name}
                                        control={control}
                                        rules={form?.rules}
                                        render={({ field }) => (
                                            <input
                                                onChange={handleInputChange}
                                                {...field} value={field?.value}
                                                type={form?.type} placeholder={form?.placeholder}
                                                className="w-full text-vw focus:outline-none p-[0.6vw] focus:shadow-md border-gray-300 border-[1px] rounded-md"
                                            />
                                        )}
                                    />
                                    <br />
                                    {errors[form?.name] && <p className='text-red-500'>{errors[form?.name]?.message}</p>}
                                </div>
                            ))}
                            </section>
                            <div className="flex w-full -mt-[2.5vw] justify-center items-center">
                                <button type='submit' className='bg-[#152347] text-white mt-2vw p-0.5vw w-full max-w-[10vw] hover:bg-[#152347e7] text-vw rounded-md'>Sign Up</button>
                            </div>
                </form>
            </main>
            </Layout>
        </div>
    )
}

export default Register