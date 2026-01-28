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
    setsubmitData(true)

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
      // console.log("JsonConverted", responseJson);
      // console.log(authentication === "login");
      
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
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <div className='p-2'>
        {authentication === "login" && <h1 className='font-extrabold text-2xl text-center'> Login Form </h1>}
        {authentication === "signup" && <h1 className='font-extrabold text-2xl text-center'>Registration Form </h1>}
        {authentication === "resetpassword" && <h1 className='font-extrabold text-2xl text-center'>Reset-Password Form </h1>}
      </div>

      <form className='flex flex-col gap-4 max-w-[444px] mx-auto shadow-md p-2 rounded-md' onSubmit={handleSubmit(formSubmission)}>
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

          <p className='flex justify-end'>
            <Link className='font-bold hover:underline text-blue-700' href='/auth/resetpassword'>Forget Password</Link>
          </p>

        </>)
        }
        <Button submission={submitData} text='Submit' className='bg-blue-400 hover:bg-blue-500 w-fit mx-auto rounded-md font-bold' />

        <div>
          {error && (<p className='font-bold text-center text-red-400'>{error}</p>)}
        </div>

        <div>
          {authentication === "login" ?
            (<p className='text-center'>If You have not Created account <Link className='font-bold hover:underline' href='/auth/signup'>Sign Up</Link></p>)
            :
            (<p className='text-center'>If You have Created account <Link className='font-bold hover:underline' href='/auth/login'>Login</Link></p>)}
        </div>
      </form>
    </div>
  )
}

export default Authentication