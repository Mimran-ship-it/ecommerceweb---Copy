'use client'
import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'
import { useCartContext } from "../../../hooks/CartContext";
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation';
export default function Page() {
const [name, setname] = useState(null) 
const [email, setemail] = useState(null) 
const [password, setpassword] = useState(null) 
const [check, setcheck] = useState(false) 
const [check2, setcheck2] = useState(false) 
const router=useRouter()
const {Loggedin}=useCartContext()
console.log(Loggedin)
function handlechange(e){
 if(e.target.name=='name'){setname(e.target.value)}
 if(e.target.name=='email'){setemail(e.target.value)}
 if(e.target.name=='password'){setpassword(e.target.value)}
  setcheck2(false)
} 

function submit(e){
  e.preventDefault()
const data={name,email,password}

  fetch(`api/Signup`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res)=>{return res.json()}).then((res)=>{setcheck(res.success)
  setcheck2(!res.success)

})
  
}


  return (<motion.div transition={{ delay: .1,stiffness: 200  }} initial={{ opacity: 0, x:200  }}  animate={{ x: 0, opacity: 1, scale: 1}} className='min-h-[100vh]'>
    {
    Loggedin && <><h1 className=' my-14  text-center  hover:font-normal text-2xl '>you are logged in <Link href={'/'} className='text-blue-500 hover:border-b-blue-500 hover:border-b '>Go to home</Link ></h1></>
    
  }
   {!Loggedin &&<div>
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
    <img className="mx-auto sm:h-20 h-16 w-auto" src="/WhatsApp Image 2023-07-20 at 06.16.09.jpg" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-4" method="POST">
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input  onChange={ handlechange} id="name" name="name" type="name"  required className="ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input onChange={ handlechange} id="email" name="email" type="email" autoComplete="email" required className="ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          
        </div>
        <div className="mt-2">
          <input onChange={ handlechange} id="password" name="password" type="password" autoComplete="current-password" required className=" ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
       
      </div>

      <div>
        <button type="submit" onClick={ submit} className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">Sign up</button>
      </div>
      {check&&<p className='text-sm text-green-500   '>succesfully signed in</p>}
      {check2&&<p className='text-sm text-red-500   '>This Email already exist </p>}
    </form>

    <div className="text-sm pt-3 ">
            <Link href={`/Signin`} className="font-semibold text-[#F78E55] hover:text-orange-500">Already have an account?</Link>
          </div>
  </div>
</div>

    </div>}</motion.div>
  )
}
