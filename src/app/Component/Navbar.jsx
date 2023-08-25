'use client'
import { useRef, useState, useEffect } from "react";
import { useCartContext } from "../../hooks/CartContext";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  let path = usePathname()
  console.log(path)
  const { cart, clearCart, totalcal, increment, decrement, Loggedin, getstatus } = useCartContext();
  const [Hover, setHover] = useState(false)
  useEffect(() => {
    console.log('cart in Navbar:', cart);
  }, [cart]);
  let key = Object.keys(cart)
  console.log('isis', key.length)
  // console.log(key.length)
  const [myVariable, setMyVariable] = useState({}); // Use state to store cart data

  const shopcartonclick = useRef()
  const shopcartoffclick = useRef()
  function Open() {
    setIsOpen((prev)=>{
      return prev=true
    });
    shopcartonclick.current.classList.remove('hidden');
    shopcartoffclick.current.classList.add('invisible')


  }
  function Close() {
    setIsOpen((prev)=>{
      return prev=false
    });
    shopcartonclick.current.classList.add('hidden')
    shopcartoffclick.current.classList.remove('invisible')
  }
  function logout() {
    router.push(`${process.env.NEXT_PUBLIC_URL}`)
    localStorage.removeItem('success')
    getstatus()
    setHover(false)
  }



  useEffect(() => {

    Close()

  }, [path])

  useEffect(() => {
    setTimeout(() => {
      Close()
    }, 80);
  }, [])




  return (

    <nav className='flex justify-between  flex-col sm:flex-row items-center box-border shadow-md py-3 sticky top-0 bg-slate-50  z-20 '>
      <div className='ps-4 text-2xl bg-slate-100 text-[#FA5909] sm:static relative right-8 bottom-1 me-1'><Link  href={'/'}>𝓜𝓪𝓪𝓷𝓲-𝔀𝓮𝓪𝓻</Link></div>
      <ul className='flex sm:space-x-10 space-x-6 space-y-3 me-10 box-border h-10 '>
        <li></li>
        <Link className={`${path === '/' ? ' font-semibold  text-[#F95709] border-b-2 ' : ''} hover:border-b-2    md:text-base text-[#F95709] hover:text-[#F7600E] text-xs mb-4`} href='/'  ><motion.div whileHover={{
  scale: 1.1,
  transition: {
    duration: .2
  }
}}><li>Home</li></motion.div></Link>
        <Link className={`${path === '/t-shirt' ? ' font-semibold  text-[#F7600E] border-b-2' : ''} hover:border-b-2   text-[#F95709] hover:text-[#F7600E] md:text-base text-xs mb-4`} href='/t-shirt'><motion.div whileHover={{
  scale: 1.1,
  transition: {
    duration: .2
  }
}}><li>T-shirt</li></motion.div></Link>
        <Link className={`${path == '/Hoodies' ? ' font-semibold text-[#F7600E]  border-b-2' : ''} hover:border-b-2   text-[#F95709] hover:text-[#F7600E] md:text-base text-xs mb-4`} href='/Hoodies'><motion.div whileHover={{
  scale: 1.1,
  transition: {
    duration: .2
  }
}}><li>Hoodies</li></motion.div></Link>
        <Link className={`${path == '/Pants' ? ' font-semibold  text-[#F7600E] border-b-2' : ''} hover:border-b-2   text-[#F95709] hover:text-[#F7600E] md:text-base text-xs mb-4`} href='/Pants'><motion.div whileHover={{
  scale: 1.1,
  transition: {
    duration: .2
  }
}}><li>Pants</li></motion.div></Link>
      </ul>
      <motion.div transition={{ delay: 0.1, stiffness: 200 }} // Animation properties
              initial={{ x:isOpen? 100:100  }} // Initial state
              animate={{ x: isOpen ? 0: 0, scale:isOpen? 1:0}} ref={shopcartonclick} className='pb-5 mt-5 shop-cart-onclick sm:w-96 w-screen shadow-lg fixed right-0 top-0 bottom-0 hidden bg-slate-100 h-auto rounded-lg z-40 overflow-y-auto '>
        <AiFillCloseCircle onClick={Close} className='fixed inline text-2xl hover text-slate-900 ms-2' />
        <span className='inline md:ps-24 m-auto ps-10  font-mono font-semibold sm:text-2xl text-lg mt-7  '>In Your Bag</span>
        <hr className='mt-3 border-black' />
        {key.length != 0 && <div className="mt-4 flex justify-between ">
          <span className='font-semibold font-mono text-base sm:text-lg p-3 sm:ms-14 ms-6'>Name</span>
          <span className='font-semibold font-mono text-base sm:text-lg p-3 me-6'>Quantity</span>
          {/* <span>Name</span> */}
        </div>}

        <motion.div initial={{ opacity: 0, scale: 0.5 }}  animate={{ x: 0, opacity: 1, scale: 1 }} className=" flex-col mb-20 sm:ms-5 ms-6 me-10 font-semibold mt-4 ">
          <div className="list-none">
            {key.length != 0 ? (
              <div
              
            >{key.map((ele) => {
                return <li key={Math.random()} className="flex justify-between items-center font-normal sm:text-sm whitespace-break-spaces list-decimal sm:w-auto  text-sm mb-10 "  ><span className="w-fit"><img src={cart[ele].img} className="object-contain rounded-lg border bg-slate-100 shadow-xl h-16 w-16" /></span><span className="ms-1 w-36 sm:text-sm text-xs h-fit">{cart[ele].name.substring(0, 30)}.../<span className="text-gray-500">{cart[ele].size}({cart[ele].color})</span></span> <span className="flex ms-3 wra "><AiFillMinusCircle onClick={() => {
                  decrement(ele)
                }} className="me-2 mt-1 md:text-lg  cursor-pointer" /> <span className="pb-5 text-base ">{cart[ele].quantity}</span><AiFillPlusCircle onClick={() => {
                  increment(ele)
                }} className=" ms-2  mt-1 md:text-lg  cursor-pointer" />
                </span></li>
              })}</div>
            ) : <div className="font-medium text-lg text-center pt-10"> Empty</div>
            } </div>


        </motion.div >
        {key.length != 0 && <div ><button className=" mt-0 text-balck font-semibold bg-white border-0 sm:py-2  px-3 block w-full mb-8  focus:outline-none cursor-default rounded-lg py-1 sm:text-lg text-base margin-auto" ><span className="text-lg font-bold">Total : </span>{totalcal} $</button>
          <button className=" mt-0 text-white bg-red-500 border-0 py-1 sm:py-2 sm:mx-2 mx-3  px-3  focus:outline-none hover:bg-red-600 rounded sm:text-base text-sm" onClick={() => { return clearCart() }}>Clear Cart</button>
          <Link href={`/Checkout`}> <button className="mt-0 text-white bg-[#FA5909] border-0 py-1 sm:py-2 sm:mx-2 mx-3  px-3  focus:outline-none hover:bg-orange-600  rounded sm:text-base text-sm" >Checkout</button></Link>
        </div>}
      </motion.div>
      <div ref={shopcartoffclick} className='flex items-center justify-between shop-cart-offclick text-sm md:text-base sm:static absolute right-3 sm:top-2 top-3  sm:pe-10 pe-2 '>{Loggedin && <span onMouseLeave={() => { return setHover(false) }} onMouseEnter={() => { return setHover(true) }} className=" h-10 sm:w-16 w-10  flex items-center justify-center text-center">
        <VscAccount className="sm:text-2xl text-base text-[#FA5909] mx-3" />
        {Hover && <div className="border z-50 rounded-lg bg-slate-100 shadow-xl sm:w-32 w-24 sm:absolute absolute top-7 right-12 sm:text-base text-xs sm:top-10 sm:right-24">
          <ul className="flex flex-col justify-start items-start ps-2 text-gray-600">
            <li className="my-2 cursor-pointer hover:text-black"><Link href={'/MyAccount'}>My Account</Link></li>
            <li className="my-2 cursor-pointer hover:text-black">Signin</li>
            <li className="my-2 cursor-pointer hover:text-black" onClick={logout}>Logout</li>
          </ul>
        </div>}
      </span>}
        <Link href={`/Signin`}>
          {!Loggedin && <button className="border hover:bg-orange-600 bg-[#FA5909] text-xs sm:text-sm p-1 sm:px-2 rounded-xl text-white" >Login</button>}</Link><span className="sm:bg-orange-500 text-xs absolute sm:top-2 top-0 sm:border border-orange-300 rounded-full sm:right-8  right-0 sm:w-5 w-3 sm:text-white
          text-orange-600 sm:font-normal sm:ps-0 ps-1 text-center" >{key.length}</span><motion.div whileHover={{
  scale: 1.05,
  transition: {
    duration: .2
  }
}}> <motion.div
      transition={{ delay: 0.1, stiffness: 200 }}
      initial={{ scale: 1 }}
      animate={{ scale: isOpen ? 1.2 : 1 }}
      onClick={Open}
    >
      <FiShoppingCart
        className={`sm:text-2xl text-base text-[#F7600E] cursor-pointer text-${isOpen ? 'blue' : '#FA5909'}`}
      />
    </motion.div>
</motion.div>
      </div>
    </nav>

  )
}

