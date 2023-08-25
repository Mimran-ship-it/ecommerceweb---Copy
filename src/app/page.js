'use client'
import { motion, AnimatePresence } from "framer-motion";
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
  const [random, setRandom] = useState(0);
  const key = useRef([]); // Use useRef to store a stable reference to key
  const intervalRef = useRef(null); // Use useRef to store a reference to the interval

  const { data: fetchdata, error } = useSWR(`/api/getproduts`, fetcheddata);
  if (fetchdata) {
    key.current = Object.keys(fetchdata.datareq); // Update the key reference without causing re-renders
  }

  const [ref, inView] = useInView();

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
// console.log('random',random)


  
    
  return (
    <AnimatePresence exit={{x:-100} } >
   <motion.div
        initial={{ opacity: 0, x:200   }}  animate={{ x : 0, opacity: 1, scale: 1}} transition={{ delay: 0,duration:.4,stiffness: 70,type:'spring' }} className='overflow-x-hidden mt-2 '>
<Head>
        <title>My page title</title>
      </Head>
      <div className="sm:flex  sm:flex-row flex-col  flex md:h-screen max-h-fit items-center justify-center  overflow-hidden -z-10">
        <div className="md:w-3/2 lg:w-1/2 sm:1/2 w-screen flex flex-col justify-center  items-center mt-5">
          <h1 className="lg:text-6xl md:text-5xl text-4xl text-[#F95709] text-center  font-thin mx-2"> &ldquo;𝙴𝚕𝚎𝚟𝚊𝚝𝚎 𝚈𝚘𝚞𝚛 𝚂𝚝𝚢𝚕𝚎&rdquo;</h1>
          <h1 className="font-sans text-center lg:text-2xl sm:text-lg font-light pt-2 text-gray-600 mx-4 w-10/12">   Discover Maani-Wear&rsquo;s Trendsetting Bedsheets in Pakistan!</h1>
          <p className="font-sans  text-base font-light w-9/12 pt-5 text-justify text-black">
          Elevate your bedroom décor with the finest bedsheets in Pakistan. Our exquisite collection of bedsheets offers a harmonious blend of comfort, style, and quality craftsmanship. Explore a diverse range of options that cater to various preferences, from vibrant colors to captivating patterns. Each bedsheets is designed to transform your sleeping space into a sanctuary of relaxation and elegance. Embrace a luxurious sleep experience night after night with our high-quality bedsheets that ensure utmost comfort and durability. Discover the perfect complement for your bedroom and indulge in a restful slumber like never before.
          </p>
          <div className="btn flex mt-5">
            <button className=" mt-0 text-white bg-[#F95402] border-0 py-1 sm:py-2 sm:mx-2 mx-3  px-3  focus:outline-none hover:bg-red-600 rounded sm:text-base text-sm" >Clear Cart</button>
            <button className=" mt-0 text-white bg-[#F95402] border-0 py-1 sm:py-2 sm:mx-2 mx-3  px-3  focus:outline-none hover:bg-red-600 rounded sm:text-base text-sm" >Clear Cart</button>

          </div>
        </div>
        <div className='flex justify-center items-center  sm:mt-0 mt-5  sm:w-1/2 w-screen sm:h-screen h-fit   overflow-x-hidden '>
          <Image quality={100} width={300} height={300}  src="/cover.png" alt="bedsheet" className='z-10 sm:w-auto w-auto  text-center rounded-full sm:h-auto h-64 md:h-64 lg:h-96 block object-contain  ' />
        </div>
      </div>


      <div  className=' box-border' >
        <section ref={ref} className="text-gray-600 body-font">
          {inView&& <motion.div initial={{ opacity: 0, x: 200,scale:0,rotate:30 }} transition={{ duration:.8, stiffness: 200 }} animate={{ x: 0,rotate:0, opacity: 1, scale: 1 }}  className="container px-5 py-24 mx-auto">
            {fetchdata&&key.current.length!=0&& <div className="border p-4 justify-center items-center shadow-2xl bg-gray-50 flex sm:flex-row flex-col w-full sm:w-9/12 h-96 m-auto box-border"><motion.div whileHover={{
  scale: 1.03,
  transition: {
    duration: .2
  }
}}><Link href={`${fetchdata.datareq[key.current[random]].category}`}>{fetchdata.datareq[key.current[random]].image&&!isObject(fetchdata.datareq[key.current[random]].image)&&<Image width={300} height={300} className="w-56 sm:h-80 h-56 object-contain me-4" src={`${fetchdata.datareq[key.current[random]].image}`} alt="bedsheet" />}</Link></motion.div>
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
