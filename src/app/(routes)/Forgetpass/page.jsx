'use client'
import {delay, motion} from 'framer-motion'
import React,{useEffect} from 'react'
import { useCartContext } from "../../../hooks/CartContext";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function Page() {
  const router=useRouter()
  const {Loggedin,random}=useCartContext()
  console.log('rrrrr',random)
  const [check, setcheck] = useState(false)
  const [email, setemail] = useState('')
  const [invalidemail, setinvalidemail] = useState(false)
    
  function handlechange(e){
  
   if(e.target.name=='email'){
    setcheck(false)
    setinvalidemail(false)
    setemail(e.target.value)}
  } 
  async function submit(e){
    
    e.preventDefault();
    const data={email,random}

   let fetchdata=await fetch(`/api/forget`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })  
    let response=await fetchdata.json()
    if (response.success){
setcheck(true)
setinvalidemail(false) 
setTimeout(() => {
  router.push(`/reset?email=${email}`)  
}, 1000);

    }else{setinvalidemail(true)
      setcheck(false)
    }
    
  }

  return (<motion.div transition={{ delay: .1,stiffness: 200  }} initial={{ opacity: 0, x:200  }}  animate={{ x: 0, opacity: 1, scale: 1}}  className='min-h-[100vh]'>
  
  {
    Loggedin && <><h1 className=' my-14  text-center  hover:font-normal text-2xl '>you are already logged in <Link href={'/'} className='text-blue-500 hover:border-b-blue-500 hover:border-b '>Go to home</Link ></h1></>
    
  }
  
  { !Loggedin&& <div>
  
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
    <img className="mx-auto sm:h-20 h-16 w-auto" src="/WhatsApp Image 2023-07-20 at 06.16.09.jpg" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
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
        
       <button onClick={submit} type="submit" className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">Send request</button>
      {check&& <div className='text-green-600 text-sm'>Check your inbox!</div>}
      {invalidemail&& <div className='text-red-500 text-sm'>This Email is not registered!</div>}
      </div>
    </form>

   
  </div>
</div>

    </div>
} </motion.div> )
}
