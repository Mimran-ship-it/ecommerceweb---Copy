'use client'
import React, { useState,useEffect } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useCartContext } from "../../../hooks/CartContext";
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';
import {motion} from 'framer-motion'

const fetcher=async()=>{
  let fetches= await fetch('api/Products')
  return fetches.json()
}


export default function Page() {
  const{data:Products,error}=useSWR("api/Products",fetcher)
console.log('prod',Products)

  const { cart, totalcal, increment, decrement,Loggedin } = useCartContext();
  let key = Object.keys(cart)
  let router = useRouter()  

  //
  const [checkprice, setcheckprice] = useState(false)
  useEffect(() => {
    if(Products?.datareq){
      Object.keys(Products.datareq).map((ele)=>{
    key.map((cartkey)=>{
      if(cart[cartkey].name==Products.datareq[ele].name&&cart[cartkey].price!=Products.datareq[ele].price){
        
        setcheckprice(true)
        console.log('setcheck(false)')
      }
      else{
        console.log(cart[cartkey].name==Products.datareq[ele].name,cart[cartkey].color==Products.datareq[ele].colo,cart[cartkey].price,Products.datareq[ele].price)
      }
    })
      })
    }
    
  }, [Products])
  
  //
  //
  const [name, setname] = useState('')
  const [LastName, setLastName] = useState('')
  const [StreetAdress, setStreetAdress] = useState('')
  const [email, setemail] = useState('')
  const [PostalCode, setPostalCode] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [check, setcheck] = useState(false)
  const [validemail, setvalidemail] = useState(true)
  const [invalidcredential, setinvalidcredential] = useState(false)
  const handlechange = (e) => {
    setinvalidcredential(false)
    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    if (e.target.name == 'LastName') {
      setLastName(e.target.value)
    }
    
    if (e.target.name == 'StreetAdress') {
      setStreetAdress(e.target.value)
    }
    if (e.target.name == 'PostalCode') {
      setPostalCode(e.target.value)
    }
    if(Loggedin){
      setemail(Loggedin)
    }
  }

  const handlesubmit = async () => {

    
    var element = {}
    key.map((ele) => {
      element = { ...element,  [ele]:{ name:cart[ele].name, quantity: cart[ele].quantity, image: cart[ele].img,color:cart[ele].color,size:cart[ele].size,price:cart[ele].price } }

    })
    console.log('element is ',element)
    const data = {
      name, LastName, StreetAdress, email, PostalCode, PhoneNumber, productName: element, price: totalcal
    }
if(!checkprice){
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
       
    if(emailPattern.test(email)){
      if(PhoneNumber.length == 11){
      
    let fetcher = await fetch(`/api/Orderapi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let order = await fetcher.json()
  
    if (!order.error) {
      router.push(`/Order?_id=${order._id}`)
      console.log(order)
      
  
      } else{
setinvalidcredential(true)
    }}else {setcheck(true)
    }
  }else{
    setvalidemail(false)
  }}
  }

  //
  return (
    <motion.div transition={{ delay: .1,stiffness: 200 }} initial={{ opacity: 0, x:200, scale:0  }} animate={{scale:1, x: 0, opacity: 1, scale: 1}} className='min-h-[100vh]'>
    {Object.keys(cart).length==0 &&<><h1 className=' mt-14 flex flex-col items-center justify-center text-center   font-mono sm:text-2xl text-lg mx-2 '>Your Cart is empty <Link href={'/t-shirt'} className='text-blue-500 hover:underline mt-4 '>Choose from a variety of t-shirts</Link ><Link href={'/Hoodies'} className='text-blue-500 hover:underline  '>Choose from a variety of Hoodies</Link ><Link href={'/Pants'} className='text-blue-500 hover:underline  '>Choose from a variety of Pants</Link ></h1></>}
    {Object.keys(cart).length!=0 && <div className='overflow-x-hidden '>

      <div className="lg:w-2/4 md:w-1/2 w-10/12  bg-white flex flex-col m-auto  md:py-8 mt-8 md:mt-0">
        <h2 className="text-gray-900 text-3xl text-center my-6 mb-1 font-medium title-font">Checkout</h2>

        <div className="relative mb-4 mt-6 ">
          <span className='inline-block'><p className='block'><label htmlFor="name" className="  text-sm text-gray-600"> Name</label></p>
            <input required value={name} onChange={handlechange} type="text" id="name" name="name" className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></span>
          <span className='inline-block sm:ms-2 lg:ms-2'><p className='block'><label htmlFor="LastName" className="  text-sm text-gray-600"> LastName</label></p>
            <input required type="text" value={LastName} onChange={handlechange} id="LastName" name="LastName" className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></span>
        </div>
        <div className="relative mb-4">
          <label htmlFor="StreetAdress" className="leading-7 text-sm text-gray-600">StreetAdress</label>
          <input required type="text" value={StreetAdress} onChange={handlechange} id="StreetAdress" name="StreetAdress" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
       {  !Loggedin&& <input
            required
            type='email'
            value={email}
            onChange={(e)=>{
              setvalidemail(true)
      setemail(e.target.value)
      
            }}
            id='email'
            name='email' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
       {  Loggedin&& <input
            required
            type='email'
            value={Loggedin}
            readOnly
           
            id='email'
            name='email' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
        </div>

        <div className="relative mb-4 ">
          <span className='inline-block'><p className='block'><label htmlFor="PostalCode" className="  text-sm text-gray-600"> PostalCode</label></p>
            <input required type="text" id="PostalCode" value={PostalCode} onChange={handlechange} name="PostalCode" className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></span>
          <span className='inline-block sm:ms-2 lg:ms-2'><p className='block'><label htmlFor="Town/City" className="  text-sm text-gray-600"> Town/City</label></p>
            <input required type="text" id="Town/City" name="Town/City" className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></span>
        </div>

        <div className="relative mb-4">
          <label htmlFor="PhoneNumber" className="leading-7 text-sm text-gray-600">PhoneNumber</label>
          <input required type="text" id="PhoneNumber" value={PhoneNumber} onChange={(e) => {
            setcheck(false)
           return setPhoneNumber(e.target.value)
          }} name="PhoneNumber" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        {!(name==''||email==''||LastName==''||StreetAdress==''||PostalCode==''||PhoneNumber==''||checkprice)&&<button onClick={handlesubmit} className="text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-500 rounded text-lg">Buy Now</button>}
        {(name==''||email==''||LastName==''||StreetAdress==''||PostalCode==''||PhoneNumber==''||checkprice)&&<button disabled onClick={handlesubmit} className="text-white bg-gray-300 py-2 px-6 focus:outline-none cursor-not-allowed rounded text-lg">Buy Now</button>}

        {check && <div className='text-[#FF4500]'>Enter valid Phone number</div>}
        {!validemail && <p style={{ color: 'red' }}>Please enter valid email address.</p>}
        {invalidcredential && <p style={{ color: 'red' }}>Please enter valid credentials .</p>}
        {checkprice&&<div className='text-[#FF4500]'>Price of some products have changed </div>

        }
      </div>
      <div className=' md:w-[40rem] m-auto h-fit border shadow-2xl mt-4 bg-slate-50'>
        {key.length != 0 && <div className="mt-4 flex justify-center ">
          <span className='font-semibold font-mono text-base sm:text-lg p-3 sm:ms-14 ms-6'>Name</span>
          <span className='font-semibold font-mono text-base sm:text-lg p-3 me-6 ms-28'>Quantity</span>
          {/* <span>Name</span> */}
        </div>}

        <div className=" flex-col mb-20 sm:ms-5 ms-6 me-10 font-semibold mt-4 ">
          <div className="list-none">
            {key.length != 0 ? (
              <div >{key.map((ele) => {
                return <li key={ele} className="flex justify-center items-center font-normal sm:text-sm whitespace-break-spaces list-decimal sm:w-auto  text-sm mb-10 "  ><span className="w-fit"><img src={cart[ele].img} className="object-contain rounded-lg border bg-white shadow-xl h-16 w-16" /></span><span className="ms-1 sm:text-sm text-xs w-36 h-fit">{cart[ele].name.substring(0,30)}...<span className='text-gray-400'>/{cart[ele].size}({cart[ele].color})</span></span> <span className="flex ms-3 wra "><AiFillMinusCircle onClick={() => {
                  decrement(ele)
                }} className="me-2 mt-1 md:text-lg  cursor-pointer" /> <span className="pb-5 text-base ">{cart[ele].quantity}</span><AiFillPlusCircle onClick={() => {
                  increment(ele)
                }} className=" ms-2  mt-1 md:text-lg  cursor-pointer" />
                </span></li>
              })}</div>
            ) : <div className="font-medium text-lg text-center pt-10"> Empty</div>
            } </div>


        </div>

      </div>
      {key.length != 0 &&
        <div className='flex w-screen justify-center items-center my-3'>
          <h1 className='font-semibold me-1 text-2xl'>Total : </h1>
          <p className='text-2xl'>{totalcal} $ </p>
        </div>
      }



    </div>}
</motion.div>
  )

}