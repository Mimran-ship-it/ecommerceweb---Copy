  
import { useState, useEffect,useRef } from "react";
const useCart = () => {
  const [cart, setCart] = useState({});
  const [Loggedin, setLoggedin] = useState(false);
  const [random, setrandom] = useState('');
  
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
      
  };

  const getstatus=()=>{
    if(localStorage.getItem('success'))
  { let check=JSON.parse(localStorage.getItem('success'))
  if(check){ setLoggedin(check.email)}}
  else{
setLoggedin(false)
  }}

  const [totalcal, settotalcal] = useState(0)
  let key=Object.keys(cart)
  useEffect(() => {
    
    var number=0
    for (let i = 0; i < key.length; i++) {
    number=number+cart[key[i]].quantity*cart[key[i]].price
    
}
settotalcal(number)
  }, [cart])
  
 
  const addToCart = (serial, name, price, quantity,img,size,color) => {
    let count=true
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    let newcart = {...currentCart};
    console.log('new',newcart)
    if(currentCart ){ Object.keys(newcart).map((ele)=>{if (newcart[ele].color==color&&newcart[ele].size==size&&newcart[ele].name==name) {
     
     newcart[ele].quantity+=1
count=false
    }
    })
  if(count){
    serial=Math.floor(Math.random()*100)
      newcart[serial] = { name, price, quantity: 1, img,size,color }
  }

  }else {
      newcart[serial] = { name, price, quantity: 1, img,size,color };
    }

    localStorage.setItem("cart", JSON.stringify(newcart));
    setCart(newcart);

  };
  
  const buynow=(serial, name, price, quantity,img,size,color) => {
    
    clearCart()
    addToCart(serial, name, price, quantity,img,size,color)
    

  }

  const increment = (serial) => {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    let newcart = { ...currentCart };
    
    if (serial in newcart) {
      newcart[serial].quantity = newcart[serial].quantity +1;
    } 

    localStorage.setItem("cart", JSON.stringify(newcart));
    setCart(newcart);

  };
  const decrement = (serial) => {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    let newcart = { ...currentCart };
    
    if (serial in newcart) {
      newcart[serial].quantity = newcart[serial].quantity - 1;
    } 
    if(newcart[serial].quantity<=0){
      delete newcart[serial];
      localStorage.setItem("cart", JSON.stringify(newcart));
    }else{
    localStorage.setItem("cart", JSON.stringify(newcart));
    
  };
  setCart(newcart);}

  useEffect(() => {
    try {
      let check=JSON.parse(localStorage.getItem('success'))
      if(check){ setLoggedin(check.email)}
      if(localStorage.getItem("cart")){
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        setCart(savedCart);}
        setrandom(Math.floor(Math.random()*1000000000)+151515)
      } catch (error) {
        console.error(error)
    }
}, []);

  return { cart, addToCart, clearCart,totalcal ,increment,decrement,buynow,Loggedin,getstatus,random};
};

export default useCart;


