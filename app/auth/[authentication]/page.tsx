'use client'

import Button from '@/components/Button';
import Input from '@/components/Input';
// import { AuthLogOut } from '@/lib/readux/authFetching';
import { AppDispatch } from '@/lib/readux/store';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';

interface FormProps {
  username: string,
  fullname: string,
  email: string,
  password: string,
  newpassword: string
}

function Authentication() {
  const { authentication } = useParams();
  // const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();
  console.log(authentication);
  const [error, setError] = useState("");
  const [submitData, setsubmitData] = useState(false);

  const { control, handleSubmit } = useForm<FormProps>();

  const formSubmission = async (data: FormProps) => {
    let apiPath = "";
    setsubmitData(true);
    setError("");

    switch (authentication) {
      case "signup":
        apiPath = '/auth/login/api?new=newAccount'
        break;
      case "login":
        apiPath = '/auth/login/api?new=login'
        break;
      case "resetpassword":
        apiPath = '/auth/resetpassword/api?new=resetpassword'
        break;
      default:
        break;
    }

    const formdata = { ...data }
    // console.log({ formdata });

    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      });

      const responseJson = await response.json();
      // console.log("JsonsConverted", responseJson);
      // console.log(authentication === "login");
      setError(responseJson.message)
      if (authentication === "login" && responseJson.status === 200) {
        console.log("login router");
        router.push("/")
      }
    } catch (error) {
      console.log("Error in form submission:- ", error);
    }finally{
          setsubmitData(false)
    }

  }

  return (
    <div className='min-h-[calc(100vh-80px)] w-full flex justify-center items-center p-4'>
      <div className='w-full max-w-md news-card shadow-lg p-8'>
        <div className='mb-8'>
          <h1 className='font-extrabold text-3xl text-center text-[var(--color-headline)]'>
            {authentication === "login" && "Welcome Back"}
            {authentication === "signup" && "Create Account"}
            {authentication === "resetpassword" && "Reset Password"}
          </h1>
          <p className="text-center text-[var(--color-meta)] mt-2">
            {authentication === "login" && "Sign in to interact with articles"}
            {authentication === "signup" && "Join our community today"}
            {authentication === "resetpassword" && "Enter your email to reset password"}
          </p>
        </div>

        <form className='flex flex-col gap-5' onSubmit={handleSubmit(formSubmission)}>
        {authentication === "signup" && (<>
            <Controller
              name='username'
              control={control}
              rules={{ required: { message: "This is required", value: true } }}
              defaultValue=""
              render={({ field, fieldState: { error } }) =>
                <Input {...field} errors={error} name='username' className='' placeholder='Enter Your username..' type='text' lableText='Username' />
              }
            />
            <Controller
              name='fullname'
              control={control}
              defaultValue=""
              rules={{ required: { message: "This is required", value: true } }}
              render={({ field, fieldState: { error } }) =>
                <Input {...field} errors={error} name='fullname' className='' placeholder='Enter Your fullname..' type='text' lableText='Fullname' />
              }
            />
            <Controller
              name='email'
              control={control}
              defaultValue=""
              rules={{ required: { message: "This is required", value: true }, validate: {} }}
              render={({ field, fieldState: { error } }) =>
                <Input {...field} errors={error} name='email' type='email' className='' placeholder='Enter Your email..' lableText='Email' />
              }
            />
            <Controller
              name='password'
              control={control}
              defaultValue=""
              rules={{ required: { message: "This is required", value: true } }}
              render={({ field, fieldState: { error } }) =>
                <Input {...field} errors={error} type='password' name='password' className='' placeholder='Enter Your password..' lableText='Password' />
              }
            />
          </>)
        }
        {authentication === "resetpassword" && (<>

          <Controller
            name='email'
            control={control}
            defaultValue=""
            rules={{ required: { message: "This is required", value: true } }}
            render={({ field, fieldState: { error } }) =>
              <Input {...field}
                errors={error} name='email' type='email' className='' placeholder='Enter Your email..' lableText='Email' />
            }
          />
          <Controller
            name='newpassword'
            control={control}
            rules={{ required: { message: "This is required", value: true } }}
            defaultValue=""
            render={({ field, fieldState: { error } }) =>
              <Input {...field}
                errors={error} type='newpassword' name='newpassword' className='' placeholder='Enter Your newpassword..' lableText='New Password' />
            }
          />

        </>)
        }
        {authentication === "login" && (<>

          <Controller
            name='email'
            control={control}
            defaultValue=""
            rules={{ required: { message: "This is required", value: true } }}
            render={({ field, fieldState: { error } }) =>
              <Input {...field}
                errors={error} name='email' type='email' className='' placeholder='Enter Your email..' lableText='Email' />
            }
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: { message: "This is required", value: true } }}
            defaultValue=""
            render={({ field, fieldState: { error } }) =>
              <Input {...field}
                errors={error} type='password' name='password' className='' placeholder='Enter Your password..' lableText='Password' />
            }
          />

          <div className='flex justify-end mt-[-10px]'>
            <Link className='text-sm font-semibold hover:underline text-[var(--color-headline)]' href='/auth/resetpassword'>Forgot Password?</Link>
          </div>

        </>)
        }
        
        <button 
          type="submit" 
          disabled={submitData}
          className='w-full py-3 mt-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50'
        >
          {submitData ? "Processing..." : "Submit"}
        </button>

        <div>
          {error && (<p className='font-bold text-center text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm'>{error}</p>)}
        </div>

        <div className="mt-4 text-center border-t border-[var(--color-divider)] pt-6">
          {authentication === "login" ?
            (<p className='text-sm text-[var(--color-meta)]'>Don't have an account? <Link className='font-bold text-[var(--color-headline)] hover:underline ml-1' href='/auth/signup'>Sign Up</Link></p>)
            :
            (<p className='text-sm text-[var(--color-meta)]'>Already have an account? <Link className='font-bold text-[var(--color-headline)] hover:underline ml-1' href='/auth/login'>Sign In</Link></p>)}
        </div>
      </form>
      </div>
    </div>
  )
}

export default Authentication