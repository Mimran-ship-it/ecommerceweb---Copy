'use client'
import './globals.css'
import { CartProvider } from "../hooks/CartContext";
import { Inter } from 'next/font/google'
import Navbar from './Component/Navbar'
import Footer from './Component/Foter'
import LoadingBar from 'react-top-loading-bar'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}) 

{
useEffect(() => {
  
  document.title = 'Bedsheets in Paksitan'
  
  
})


  const router=useRouter()
  const [progress, setProgress] = useState(0)
  const [layoutUpdate, setLayoutUpdate] = useState(0);
  const [description, setDescription] = useState(' Elevate your bedroom décor with the finest bedsheets in Pakistan. Our exquisite collection of bedsheets offers a harmonious blend of comfort, style, and quality craftsmanship. Explore a diverse range of options that cater to various preferences, from vibrant colors to captivating patterns. Each bedsheets is designed to transform your sleeping space into a sanctuary of relaxation and elegance');

  useEffect(() => {
    // This function will be called every time the description changes
    const head = document.querySelector('head');
    const metaEl = document.createElement('meta');
    metaEl.name = 'description';
    metaEl.content = description;
    head.appendChild(metaEl);
  }, [description]); 
  useEffect(() => {
    setProgress(100);
    console.log('URL has changed:', router.pathname);
    setLayoutUpdate(layoutUpdate + 1); // Increment the layout update variable to trigger a re-render

    // Cleanup function to reset the progress after rendering
    return () => {
      setProgress(0);
    };
  }, [router.pathname]);
  return (
    <html lang="en">
    <Head>
  <meta name="description" content={description} />
     
</Head>
      <body className={inter.className}>
      <CartProvider >
      <LoadingBar
        color='#3B82F6'
        progress={progress}
        
        onLoaderFinished={() => setProgress(0)}
      />
        <Navbar  ></Navbar>
        {children }
        <Footer></Footer>

        </CartProvider>

        </body>
    </html>
  )
}
