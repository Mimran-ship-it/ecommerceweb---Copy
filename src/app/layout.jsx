'use client'
import './globals.css'
import { CartProvider } from "../hooks/CartContext";
import { Inter } from 'next/font/google'
import Navbar from './Component/Navbar'
import Footer from './Component/Foter'
import LoadingBar from 'react-top-loading-bar'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}) 
{
  const router=useRouter()
  const [progress, setProgress] = useState(0)
  const [layoutUpdate, setLayoutUpdate] = useState(0); 
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
