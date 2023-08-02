import  { React,useEffect,useRef, useState ,useContext} from 'react'
import {Link} from 'react-router-dom'
import {client} from '../lib/client'
import {FaShoppingCart ,FaSearch, FaSyncAlt, FaBars, FaTimes} from 'react-icons/fa'
import Context from '../context/Context'
import { Cart } from '.'
import NavLogo from '../Images/logoNav.jpg'
import Product from './Product'
import '../Styles/navbar.css'


export default function Navbar(){
const navRef = useRef();
const {qty,showCart,actions} = useContext(Context)

const handleShowCart = () =>{
    actions({ type: "setShowCart", payload: true });
  }

const showNav = () => {
    navRef.current.classList.toggle("responsive_nav");
};

    return(
        <div>
       <header>
        <Link className='home-link' to="/">
        <a ><img className="logoNavbar"  src={NavLogo} alt='' /> <span className='marketName'> Kristi Market</span></a>
        </Link>
        <nav ref={navRef}>
          
                <Link to='/product/category/laptop'> <a onClick={showNav}>Laptops</a></Link>  
                <Link to='/product/category/monitor'> <a onClick={showNav}>Monitors</a></Link>   
                <Link to='/product/category/accessories'> <a onClick={showNav}>Accessories</a></Link>  
                <Link to ='/product/category/all'>  <a onClick={showNav}>All Products</a></Link>    
       
      
     
         
            <a className='searchMain'>
            
           <FaSearch/>
       <input className='searchBox' type="text" 
       placeholder = "What are u looking for" />
       </a>
     
       <a className='cartIcon' onClick={handleShowCart}>< FaShoppingCart/> <span className="cartCount">{qty}</span> </a>
     
            <button className='nav-btn nav-close-btn' onClick={showNav}>
            <FaTimes/>
        
            </button>
        </nav>
        <button className='nav-btn nav-btn-menu' onClick={showNav}>
        <FaBars/>         
        </button>
         
       </header>

       </div>
       
    );

   
}

    
  