'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "@/hooks/CartContext"; 
import { useInView } from 'react-hook-inview'
import useSWR from 'swr'
import Link from "next/link";
import { useState,useRef,useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { isObject } from "util";




const fetcheddata=async ()=>{

let fetcher= await fetch('/api/Products')
return fetcher.json()
}




export default function Home() {
  const {setcolor}=useCartContext()
  const [random, setRandom] = useState(0);
  const key = useRef([]); // Use useRef to store a stable reference to key
  const intervalRef = useRef(null); // Use useRef to store a reference to the interval

  const { data: fetchdata, error } = useSWR(`/api/getproduts`, fetcheddata);
  if (fetchdata) {
    key.current = Object.keys(fetchdata.datareq); // Update the key reference without causing re-renders
  }

  const [ref, inView] = useInView();
  const [refer, inViews] = useInView();
  if(inViews){
    setcolor(true)
  }else{setcolor(false)}

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRandom(() => Math.floor(Math.random() * key.current.length));
    }, 2000);
 console.log('mounted')
    return () => {
      // Clear the interval when the component unmounts or when the dependency changes
      clearInterval(intervalRef.current);
      console.log('unmounted')
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  
    
  return (
    <AnimatePresence exit={{x:-100} } >
   <motion.div
        initial={{ opacity: 0,scale:0    }}  animate={{  opacity: 1, scale: 1}} transition={{ delay: 0,duration:.5,stiffness:50 }} className='overflow-x-hidden z-40'>

      <motion.video initial={{ opacity: 0,scale:0    }}  animate={{  opacity: 1, scale: 1}} transition={{ delay: .5,duration:.5,stiffness:50 }} type="video/mp4" src="https://cdn.shopify.com/videos/c/o/v/2f3787bdb71b4e06be54045e46061698.mp4" autoPlay data-autoPlay muted  loop playsInline className="-z-10 h-screen fixed sm:top-10 top-20 object-fill sm:object-cover w-screen "></motion.video> 
<div ref={refer} className=" bg-transparent z-40 h-screen">
{/* <motion.div initial={{x:100,scale:0}} animate={{x:0,scale:1}} transition={{delay:.7,stiffness:50}} className="flex flex-col">

  
</motion.div> */}
  
</div>


      <div  className=' box-border z-40 bg-white' >
        <section ref={ref} className="text-gray-600 body-font">
          {inView&& <motion.div initial={{ opacity: 0, x: 200,scale:0,rotate:30 }} transition={{ type:'tween',duration:.4,delay: 0.4, stiffness: 50 }} animate={{ x: 0,rotate:0, opacity: 1, scale: 1 }}  className="container px-5 py-24 mx-auto">
            {fetchdata&&key.current.length!=0&& <div className="border p-4 justify-center items-center shadow-2xl bg-gray-50 flex sm:flex-row flex-col w-full sm:w-9/12 h-96 m-auto box-border"><motion.div whileHover={{
  scale: 1.03,
  transition: {
    duration: .2
  }
}}><Link href={`${fetchdata.datareq[key.current[random]].category}`}>{fetchdata.datareq[key.current[random]].image&&!isObject(fetchdata.datareq[key.current[random]].image)&&<Image width={300} height={300} className="w-56  sm:h-80 h-56 object-contain me-4" src={`${fetchdata.datareq[key.current[random]].image}`} alt="bedsheet" />}</Link></motion.div>
            <div>{console.log(fetchdata.datareq[key.current[random]].image)}
           <motion.div className="mt-2 ms-2" whileHover={{
  scale: 1.02,
  transition: {
  duration: .2
  }
}}> <Link href={`/${fetchdata.datareq[key.current[random]].category}`}> <h1 className="font-mono md:text-lg text-base md:w-80 w-auto whitespace-pre-wrap">{key.current[random]}</h1></Link></motion.div>
            
            </div>
            </div>
           }
 

          </motion.div>}
        </section>
      </div>
    </motion.div >
    </AnimatePresence>
  )
}
