'use client'
import React from 'react'
import {motion} from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import { useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

export default function Style({children}) {
let animation=useAnimationControls()

    const { ref, inView, entry } = useInView({threshold:.5});
    console.log(inView)
useEffect(() => {
  if(inView){
    animation.start({y:0})
return 0  
}
    animation.start({y:-100})
  

  
}, [inView])


  return (
    
    <motion.div ref={ref} animate={animation} transition={{ delay: 0.5 }}>
      {children}
    </motion.div>
  
  )
}
