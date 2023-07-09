import  { useRef } from 'react'
import {FaShoppingCart ,FaSearch, FaSyncAlt, FaBars, FaTimes} from 'react-icons/fa'
import { renderToString } from 'react-dom/server';
import NavLogo from '../Images/logoNav.jpg'

import '../Styles/navbar.css'


export default function Navbar(){
const navRef = useRef();

const showNav = () => {
    navRef.current.classList.toggle("responsive_nav");
};

    return(
       <header>
        <a ><img className="logoNavbar"  src={NavLogo} alt='' /> <span className='marketName'>Astra Market</span></a>
        <nav ref={navRef}>
          
            <a onClick={showNav}>Female</a>
            <a onClick={showNav}>Male</a>
            <a onClick={showNav}>Kids</a>
            <a onClick={showNav}>All Products</a>
            <a className='searchMain'>
            
           <FaSearch/>
       <input className='searchBox' type="text" 
       placeholder = "What are u looking for" />
       </a>
       <a className='cartIcon'>< FaShoppingCart/> <span className="cartCount">0</span> </a>
            <button className='nav-btn nav-close-btn' onClick={showNav}>
            <FaTimes/>
        
            </button>
        </nav>
        <button className='nav-btn nav-btn-menu' onClick={showNav}>
        <FaBars/>         
        </button>
       
     
       </header>
    );
}