'use client'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useMemo } from "react";
import React from 'react'
import { useCartContext } from "../../../../hooks/CartContext";
import useSWR from 'swr'
const fetcher = async () => {
  const response = await fetch(`/api/getproduts`, {
    next: { revalidate: 0 }
  });
  const data = await response.json();
  return data;
};




function Page({ params }) {
  const router = useRouter()
  const { addToCart, buynow } = useCartContext()
  const [select, setselect] = useState(null)
  const [color, setcolor] = useState('defaultSize')
  const [checkCart, setcheckCart] = useState(false)
  const [Image, setImage] = useState('')
  const [initialSize, setinitialSize] = useState('')
  const [initialColor, setinitialColor] = useState('')

 
  useEffect(() => {
    if (select != '' && color != '' && select != "select") {
      setcheckCart(true)
    } else { setcheckCart(false) }
  }, [select, color])
  
  const { data: fetchdata, error } = useSWR(`/api/getproduts`, fetcher);
  const keys = fetchdata?.datareq ? Object.keys(fetchdata.datareq) : [];
  useEffect(()=>{
    keys.map((ele) => {
      console.log(params.id , fetchdata.datareq[ele].slug)
      if (params.id == fetchdata.datareq[ele].slug) {
    
        if(keys&&keys.length > 0){ setinitialSize (Object.keys(fetchdata.datareq[ele].size)[0])
          setinitialColor (fetchdata.datareq[ele].size[Object.keys(fetchdata.datareq[ele].size)[0]][0])}
  
       }})},[router.path,keys])
  
  useEffect(()=>{
  keys.map((ele) => {
    console.log(params.id , fetchdata.datareq[ele].slug)
    if (params.id == fetchdata.datareq[ele].slug) {
  
    console.log('color',initialColor)
    setImage(fetchdata.datareq[ele].image[initialColor]);

    setselect(initialSize);
    setcolor(initialColor);  }})},[initialColor,initialSize])
    
  


  // .....................

  if (!fetchdata) {
    // Handle loading state while data is being fetched
    return     <div className='w-screen flex h-screen justify-center items-center'>
    <span className='text-center block text-5xl font-sans text-gray-600'>loading....</span>
  </div>;
  }
  

  //.....................
// console.log('blala',fetchdata.datareq)
  return (
    <motion.div transition={{ delay: .1,stiffness: 200  }} initial={{ opacity: 0, scale: 0.5 }}  animate={{ x: 0, opacity: 1, scale: 1 }}>
      {keys.map((ele) => {
        

        return params.id == fetchdata.datareq[ele].slug && <section key={Math.random()}
       
         className="text-gray-600 body-font overflow-hidden">
         
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
             {Image!='' &&<img  alt="ecommerce" className=" lg:w-1/4 w-full lg:h-auto h-64 object-contain object-center rounded" src={Image} />}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">𝓜𝓪𝓪𝓷𝓲-𝔀𝓮𝓪𝓻</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{fetchdata.datareq[ele].name}/{select}</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeinejoin="round" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeinejoin="round" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeinejoin="round" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                  {Object.keys(fetchdata.datareq[ele].size).map((size) => {
                      return size == select &&Array.isArray(fetchdata.datareq[ele].size[size])&& <div key={Math.random()}>
                      {fetchdata.datareq[ele].size[size].map((color)=>{return <button  key={Math.random()} value={color} className= '  text-sm  shadow-2xl hover:bg-slate-300 ml-1 border appearance-none border-gray-300 m-1 p-1' onClick={(e) => {  setImage(fetchdata.datareq[ele].image[e.target.value]); setcolor(e.target.value)
                                            
                       }}>{color}</button>})}
                        
                       
                      </div >

                    })
                    }
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                        <select value={select} onChange={(e) => {
                        setselect(e.target.value)
                        setcolor('')

                      }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        <option key='1'>select</option>
                         {fetchdata.datareq[ele].size ?Object.keys(fetchdata.datareq[ele].size).map((size) => {
                          return <option key={Math.random()}>{size}</option>
                        }):<></>}
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <span className="title-font font-medium sm:text-2xl text-base text-gray-900">{fetchdata.datareq[ele].price}.00</span>
                  {checkCart && <button onClick={() => {
                    router.push(`/Checkout`)
                    return buynow(params.id, fetchdata.datareq[ele].name, fetchdata.datareq[ele].price, 1, Image, select, color)
                  }} className={"mt-0 text-white bg-orange-400 border-0 sm:py-2 sm:mx-6 mx-3  px-3  focus:outline-none sm:text-sm text-xs  hover:bg-orange-500 rounded"} >Buy now</button>}
                  {!checkCart && <button onClick={() => {
                    router.push(`/Checkout`)
                    return buynow(params.id, fetchdata.datareq[ele].name, fetchdata.datareq[ele].price, 1, Image, select, color)
                  }} disabled className={"bg-gray-300 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ms-4 sm:text-sm text-xs "} >Buy now</button>}
                  {!checkCart && <button disabled onClick={() => { return addToCart(params.id, fetchdata.datareq[ele].name, fetchdata.datareq[ele].price, 1, Image, select, color) }} className={"bg-gray-300 text-white sm:py-2 sm:mx-6 mx-3 sm:text-sm text-xs  px-3  rounded-md disabled:opacity-50 disabled:cursor-not-allowed"}>Add to cart</button>}
                  {checkCart && <button onClick={() => { return addToCart(params.id, fetchdata.datareq[ele].name, fetchdata.datareq[ele].price, 1, Image, select, color) }} className="mt-0 sm:text-sm text-xs text-white bg-indigo-500 border-0 sm:py-1 sm:mx-4 mx-2 sm:px-3  px-5  focus:outline-none hover:bg-indigo-600 rounded sm:text-base text-xs">Add to cart</button>}
                  <button className="rounded-full w-10 h-10 bg-gray-200 sm:py-2 sm:mx-6 mx-3  px-3 border-0 inline-flex sm:text-sm text-xs items-center justify-center text-gray-500  sm:text-base text-xs">
                    <svg fill="currentColor" strokeLinecap="round" strokeinejoin="round" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>

              </div>
              <div className='mt-10 text-center sm:flex-col md:flex-row justify-center items-center  w-screen flex-col '>
                </div>
           
           
            </div>
          </div>
        </section>
      })}
    </motion.div>
  )

}


export default Page