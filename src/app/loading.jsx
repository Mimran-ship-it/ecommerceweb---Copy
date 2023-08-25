'use client'
import React from 'react'
import {motion, spring} from 'framer-motion'
export default function Loading() {
  const loadervariant={
    animate:{y:[0,-100],transition:{type:'spring',y:{repeat:Infinity,duration:.3,ease:'easeOut'}}}
  } 
  return (
    <motion.div className='w-screen flex h-screen justify-center items-center'>
      <motion.span variants={loadervariant} animate='animate' className='block  shadow-2xl border w-16 h-16 bg-gray-600 rounded-full border-gray-600 m-auto'></motion.span>
    </motion.div>
  )
}
