'use client'
import {motion} from 'framer-motion'
import React from 'react'
import useSWR from 'swr';
import {useCartContext} from '../../../hooks/CartContext'
const fetcher=async ()=>{
    let fetche=await fetch(`/api/Orderpage`,{
    next: { revalidate: 0 }
  })
    return fetche.json()
}
export default  function Page() {
    let {Loggedin}=useCartContext()
    console.log('is',Loggedin)
    const { data:reqdata, isLoading, error } = useSWR(`/api/user`, fetcher)
    console.log(reqdata)

return (
   
    <motion.div transition={{ delay: .1,duration:.5,stiffness: 200  }} initial={{ opacity: 0, scale:0 ,x:'100rem' }}  animate={{ x: 0, opacity: 1, scale: 1}} className='flex flex-col items-center justify-center min-h-[100vh]'>
    <h1 className='my-10 sm:text-3xl text-2xl font-mono underline '>YOUR PREVIOUS ORDERS</h1>
{Loggedin?<div className=' '>

{reqdata? reqdata.map((ele)=>{
    
    return ele.Email==Loggedin&&<div key={Math.random()} className='flex'><div  className='flex-col flex p-5 sm:px-20 sm:py-10 mx-2 border-orange-400 border shadow-2xl  mb-10  justify-center items-center' >{Object.keys(ele.productName).map((element)=>{
        return <li  key={Math.random()} className="flex my-2"  ><span className="w-fit mx-5"><img src={ele.productName[element].image} className="object-contain rounded-lg border bg-white shadow-xl h-16 w-16 " /></span><span className="ms-1 w-36 md:w-56 h-fit">{(ele.productName[element].name)?.substring(0,35)}/<span className='text-gray-400'>{ele.productName[element].size}({ele.productName[element].color})</span></span> </li>
    })
    
    
    }
    </div>
    </div>

}
):<></>
}

</div>
:<></>
} 

    </motion.div>
  )
}
