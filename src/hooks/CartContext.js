import { createContext, useContext } from "react";
import useCart from './useCart'
const CartContext = createContext();  
export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
    const { cart, addToCart, clearCart,totalcal,increment,decrement,buynow,Loggedin,getstatus,random } = useCart();
    
  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart,totalcal ,increment,decrement,buynow,Loggedin,getstatus,random}}>
      {children}
    </CartContext.Provider>
  );
}
