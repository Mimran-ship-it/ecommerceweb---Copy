'use client'
import { motion } from "framer-motion";
export default function Home() {
  return (
    <motion.div initial={{ opacity: 0, x:200  }} transition={{ delay: .1,stiffness: 200  }}  animate={{ x: 0, opacity: 1, scale: 1}} className='overflow-x-hidden mt-2 border'>
{/* <div className='block border w-screen max-h-96 overflow-x-hidden shadow-md '> */}
<div className="sm:flex  sm:flex-row flex-col  flex md:h-screen max-h-fit items-center justify-center  overflow-hidden -z-10">
<div className="md:w-3/2 lg:w-1/2 sm:1/2 w-screen flex flex-col justify-center  items-center mt-5">
<h1 className="lg:text-6xl md:text-5xl text-4xl text-[#F95709] text-center  font-thin mx-2"> &ldquo;𝙴𝚕𝚎𝚟𝚊𝚝𝚎 𝚈𝚘𝚞𝚛 𝚂𝚝𝚢𝚕𝚎&rdquo;</h1>
<h1 className="font-sans text-center lg:text-2xl sm:text-lg font-light pt-2 text-gray-600 mx-4 w-10/12">   Discover Maani-Wear&rsquo;s Trendsetting T-Shirts and Hoodies!</h1>
<p className="font-sans text-base font-light w-9/12 pt-5 text-justify text-black">
  Welcome to Maani-Wear, your ultimate destination for premium t-shirts and hoodies that effortlessly blend style and comfort. We believe that fashion is not just about making a statement but also embracing individuality. Step into a world where each design is a work of art, meticulously crafted to reflect your unique personality and passions. Whether you&apos;re looking for a laid-back casual look or an eye-catching conversation starter, our diverse collection has something for everyone.
</p>
<div className="btn flex mt-5">
<button className=" mt-0 text-white bg-[#F95402] border-0 py-1 sm:py-2 sm:mx-2 mx-3  px-3  focus:outline-none hover:bg-red-600 rounded sm:text-base text-sm" >Clear Cart</button>
<button className=" mt-0 text-white bg-[#F95402] border-0 py-1 sm:py-2 sm:mx-2 mx-3  px-3  focus:outline-none hover:bg-red-600 rounded sm:text-base text-sm" >Clear Cart</button>

</div>
</div>
<div className='flex justify-center items-center  sm:mt-0 mt-5  sm:w-1/2 w-screen sm:h-screen h-fit   overflow-x-hidden '>
<img src="/cover.png" alt="" className='z-10 sm:w-auto  text-center rounded-full sm:h-auto h-64 md:h-64 lg:h-96 block object-contain  ' />
</div>
</div>
  <div  className='box-border mt-10 border' >
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">Raw Denim Heirloom Man Braid
      {/* <br className="hidden sm:block">Selfies Wayfarers </br> */}
    </h1>
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
      <div className="p-4 md:w-1/3 flex">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24" data-darkreader-inline-stroke="" style={{darkreaderinlinestroke: "currentColor"}}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-2">Shooting Stars</h2>
          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard ugh iceland kickstarter tumblr live-edge tilde.</p>
          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24" data-darkreader-inline-stroke="" style={{darkreaderinlinestroke: "currentColor"}}>
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24" data-darkreader-inline-stroke="" style={{darkreaderinlinestroke: "currentColor"}}>
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
          </svg>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-2">The Catalyzer</h2>
          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard ugh iceland kickstarter tumblr live-edge tilde.</p>
          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24" data-darkreader-inline-stroke="" style={{darkreaderinlinestroke: "currentColor"}}>
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24" data-darkreader-inline-stroke="" style={{darkreaderinlinestroke: 'currentColor'}}>
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-2">Neptune</h2>
          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard ugh iceland kickstarter tumblr live-edge tilde.</p>
          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24" data-darkreader-inline-stroke="" style={{darkreaderinlinestroke: "currentColor"}}>
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
    </motion.div >
     )
}
