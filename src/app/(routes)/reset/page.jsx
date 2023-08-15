'use client'
import React,{useEffect} from 'react'
import {useCartContext} from '../../../hooks/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation';
export default function Page() {
  let {Loggedin,random}=useCartContext()
  
  const router=useRouter()
  const searchParams = useSearchParams()
const email=searchParams.get('email')
    console.log(email)
  const [token, settoken] = useState(null) 
  const [npassword, setnpassword] = useState('') 
  const [cpassword, setcpassword] = useState('') 
  const [confirm, setconfirm] = useState(false) 
  const [ctoken, setctoken] = useState(false) 

  function handlechange(e){
   if(e.target.name=='token'){settoken(e.target.value)}
   if(e.target.name=='npassword'){setnpassword(e.target.value)}
   if(e.target.name=='cpassword'){setcpassword(e.target.value)}
   
  } 
  async function submit(e){
    
    e.preventDefault();
    if(token==random&&cpassword==npassword){console.log('matched')
    const data={cpassword,email}
    let fetchdata=await fetch(`/api/resetpassword`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let result=await fetchdata.json()
      if(!result.success){
        setconfirm(false)
      }
     if( result.success){
      setconfirm(true)
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_URL}/Signin`)
      }, 1000);
     }

}else{
    setctoken(true)
}


  }

  return (<div className='min-h-[100vh]'>
  
  {
    Loggedin && <><h1 className=' my-14  text-center  hover:font-normal text-2xl '>you are already logged in <Link href={'/'} className='text-blue-500 hover:border-b-blue-500 hover:border-b '>Go to home</Link ></h1></>
    
  }
  
  { !Loggedin&& <div>
  
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm   ">
    <img className="mx-auto sm:h-20 h-16 w-auto" src="/WhatsApp Image 2023-07-20 at 06.16.09.jpg" alt="Your Company"/>
    </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-5" method="POST">
      <div>
        <label htmlFor="token" className="block text-sm font-medium leading-6 text-gray-900">Confirm token (<span className='text-blue-500'>Check your Mail</span>)</label>
        <div className="mt-2">
          <input onChange={(e)=>{
            setctoken(false)
            return settoken(e.target.value)
          }} id="token" name="token" type="token" required className="ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="npassword" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
          
        </div>
        <div className="mt-2">
        <input onChange={(e)=>{
            return setnpassword(e.target.value)
          }}  id="npassword" name="npassword" type="password" autoComplete="current-password" required className=" ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          
        </div>
        <div className="mt-2">
        <input onChange={(e)=>{
            
        return setcpassword(e.target.value)
          }}  id="cpassword" name="cpassword" type="password" autoComplete="current-password" required className=" ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
      {(cpassword.length<4||npassword.length<4||token==null||cpassword!=npassword)&&<button disabled onClick={submit} type="submit" className="flex w-full  justify-center rounded-md bg-gray-400 cursor-not-allowed px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">Update Password</button>}
      {(cpassword.length>=4&&npassword.length>=4&&token!=null&&cpassword==npassword)&&<button onClick={submit} type="submit" className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">Update Password</button>}
      {confirm&& <div className='text-sm text-green-500'>Password updated successfully</div>}
      {cpassword!=npassword&& <div className='text-sm text-red-500'>Password donot matched</div>}
      {ctoken&& <div className='text-sm text-red-500'>Please enter correct token</div>}
      </div>
    </form>


  </div>
</div>

    </div>
} </div> )
}
