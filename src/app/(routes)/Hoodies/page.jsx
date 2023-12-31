'use client'
import {motion} from 'framer-motion'
import React from 'react';
import useSWR from 'swr'
import Image from 'next/image';
import Link from 'next/link';
const fetcher = async (props) => {
console.log('props',props)
  const response = await fetch(`/api/Products`, {
    next: { revalidate: 0 }


  });
  const data = await response.json();
  return data;
};
const Page= ()=> {
  
    
    const { data: globaldata, error } = useSWR(`/api`, fetcher);
  const keys = globaldata?.datareq ? Object.keys(globaldata.datareq) : [];

  const loadervariant={
    animate:{y:[0,-100],transition:{type:'spring',y:{repeat:Infinity,duration:.4,ease:'easeOut'}}}
  } 
  if (!globaldata) {
    // Handle loading state while dataz is being fetched
    return <motion.div className='w-screen flex h-screen justify-center items-center'>
    <motion.span variants={loadervariant} animate='animate'  className='block  shadow-2xl border w-16 h-16 bg-gray-600 rounded-full border-gray-600 m-auto'></motion.span>
  </motion.div>
  }
let key=Object.keys(globaldata.datareq)

    return (  
      <motion.div
        initial={{ opacity: 0, x:200   }}  animate={{ x : 0, opacity: 1, scale: 1}} transition={{ delay: .6,duration:.4,stiffness: 70,type:'spring' }}>
        <section className="text-gray-600 body-font lg:ms-36">
    <div  className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
           {key.map((ele)=>{          
             return globaldata.datareq[ele].category=='Hoodies' && 
             <motion.div whileHover={{
  scale: 1.03,
  transition: {
    duration: .2
  }
}} key={globaldata.datareq[ele].name} className="lg:w-64 mb-5  md:w-60 p-7 w-5/6 h-auto ms-8 sm:ml-2  sm:h-auto lg:me-10 xl:me-20 shadow-2xl border border-orange-300 ">
          <Link className="block relative rounded overflow-hidden cursor-pointer h-3/6" href={'/Hoodies/'+ globaldata.datareq[ele].slug}> 
          <Image  height={300} width={300} alt="ecommerce" className="object-contain object-center w-auto sm:w-72 ps-16 md:w-full h-full block" src={globaldata.datareq[ele].image}/>
          </Link>
          <div className="mt-4 h-1/6 w-auto mb-2">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{globaldata.datareq[ele].category}</h3>
            <h2 className="text-gray-900 font-normal lg:text-base md:text-lg hover:underline cursor-pointer hover:text-orange-400">{globaldata.datareq[ele].name.substring(0,45)}...</h2>
          </div>
          <div className='h-2/6 mt-8 space-x-5'>
            <p className="my-1 pt-1">$18.40</p>
            <span className='mt-2'> {
              Array.isArray(globaldata.datareq[ele].size)&&<>
              {globaldata.datareq[ele].size.map((ele)=>{
                return <span key={Math.random()} className='shadow-lg border mx-[.1rem] font-semibold cursor-pointer'>{ele} </span>
              })}</>
            
            }</span>
           <span className='mt-2'> {
            Array.isArray(globaldata.datareq[ele].color)&&<>
             { globaldata.datareq[ele].color.map((ele)=>{
                return <span key={Math.random()} className='w-13 h-3 border shadow-inner  rounded-full cursor-pointer text-sm' > {ele}</span>
              })}</>
            }</span>
        </div>
        </motion.div>
      }
      )}
      </div>
    </div>
  
  </section>
      </motion.div>
    )
  }
  
  
  
  export default Page 
