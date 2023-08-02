import React, { useContext,useEffect } from 'react'
import {FaInstagram,FaFacebook,FaTwitch,FaWhatsapp,FaLinkedinIn, FaTwitter} from 'react-icons/fa'
import '../Styles/footer.css'
import Context from '../context/Context'
import { Cart } from '.'
import stripePromise  from  '../lib/getStripe'
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'



function Footer() {
  const {showCart,showPayment,actions} = useContext(Context)
  const date = new Date()
  const year = date.getFullYear()
  const stripePromise = loadStripe('pk_test_51NZWaJFncAM87BhXoWKqVYU4cceBNKyupMIfHe6GaUEioPlW2BUP4QSrG0t0zxLkWihmiyIbPRc8MjKbtMQ3EHrn00OiKFVlnZ');



  return (
    <footer>
      <div className='footer-conatiner'>
      <div className='first-nested-container footerC'>
      <h3>Shop</h3>
      <p>Electronic device</p>
      <p>Gift Cards</p>
      <p>Refer a Friend</p>
      <p></p>
      </div>
      <div className='second-nested-container footerC'>
       <h3>Help</h3>
       <p>Contact us</p>
       <p>FAQ</p>
       <p>Accessibility</p>
       <h1>
      
      </h1>
      </div>
      <div className='third-nested-container footerC'>
        <h3>About</h3>
        <p>Term of Use</p>
        <p>Privacy Policy</p>
        <p>How it Works</p>
        <p>Contact Us</p>
      </div>
      <div>
       <h4>Connect with us</h4>
       <div className='footer-icons'>
        <span className='instagram'><FaInstagram/></span>
        <span className='facebook'> <FaFacebook/></span>
        <span className='twitter'>  <FaTwitter/></span>
        <span className='whatsapp'><FaWhatsapp/></span>
        <span className='linkedin'><FaLinkedinIn/></span>
       
      
    
       </div>
      
      </div>
      </div>
      <div>
     <h4 className='footer-rights-reserved'> © {year} Kristi Market, All Rights Reserved</h4>
     
     <p></p>
     <p></p>
      </div>

      {showCart && <Cart/>}
    
    </footer>
  )
}

export default Footer