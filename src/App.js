import React, { useState ,useContext} from 'react'
import './App.css';
import './Styles/product.css'
import { ProductDetails } from './pages/[slug]';
import NavBar from './Components/Navbar';
import { Footer } from './Components';
import { StateContext } from './context/Context';
import {Layout} from './Components';
import {Toaster} from 'react-hot-toast'
import Home from './Components/Home'
import Context from './context/Context';
import { Cart } from './Components';


function  App({ Component, pageProps }) {
 
const [cart, setCart] = useState(0)
const {showCart} = useContext(Context)
function handleProductClick(){
   setCart((prevCart) => prevCart+1 )
   console.log(cart)
}
   
  return (

   
       <div className='app-conainter' >
      <header>
         <NavBar/>
      </header>
    
        <Toaster/>
         <Home />
    
     
       <Footer/>
      
         </div>
        
     
  );
 
}



export default App;
