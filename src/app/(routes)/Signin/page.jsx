'use client'
import React,{useEffect} from 'react'
import {motion} from 'framer-motion'
import {useCartContext} from '../../../hooks/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function Page() {
  let {Loggedin,getstatus}=useCartContext()
  
  const router=useRouter()
 
  
    
  const [name, setname] = useState(null) 
  const [email, setemail] = useState(null) 
  const [password, setpassword] = useState(null) 
  const [check, setcheck] = useState(true) 

  function handlechange(e){
   if(e.target.name=='name'){setname(e.target.value)}
   if(e.target.name=='email'){setemail(e.target.value)}
   if(e.target.name=='password'){setpassword(e.target.value)}
   setcheck(true)
  } 
  async function submit(e){
    
    e.preventDefault();
    const data={email,password}

   let fetchdata=await fetch(`/api/checkSignup`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let result=await fetchdata.json()
    if(!result.success){
      setcheck(false)
    }
   if( result.success){
    localStorage.setItem('success',JSON.stringify({'success':result.success,email:email}))
    router.push('/')
    getstatus()
   }
  }

  return (<motion.div transition={{ delay: .1,stiffness: 200  }} initial={{ opacity: 0, x:200  }}  animate={{ x: 0, opacity: 1, scale: 1}} className='min-h-[100vh]'>
  
  {
    Loggedin && <><h1 className=' my-14  text-center  hover:font-normal text-2xl '>you are already logged in <Link href={'/'} className='text-blue-500 hover:border-b-blue-500 hover:border-b '>Go to home</Link ></h1></>
    
  }
  
  { !Loggedin&& <div>
  
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
    <img className="mx-auto sm:h-20 h-16 w-auto" src="/WhatsApp Image 2023-07-20 at 06.16.09.jpg" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-5" method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input onChange={handlechange} id="email" name="email" type="email" autoComplete="email" required className="ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link href="/Forgetpass" className="font-semibold text-[#F78E55] hover:text-orange-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input onChange={handlechange} id="password" name="password" type="password" autoComplete="current-password" required className=" ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button onClick={submit} type="submit" className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">Sign in</button>
      {!check&& <div className='text-sm text-red-500'>The provided email and password match.</div>}
      </div>
    </form>

    <div className="text-sm pt-3 ">
            <Link href={`/Signup`} className="font-semibold text-[#F78E55] hover:text-orange-500">Not a member?</Link>
          </div>
  </div>
</div>

    </div>
} </motion.div> )
}
