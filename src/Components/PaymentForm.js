// Payment.js
import React, {useContext} from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Context from '../context/Context';
import toast from 'react-hot-toast'
import '../Styles/payment.css'; // Import the CSS file for styling
import axios from 'axios';
import { TiDeleteOutline } from 'react-icons/ti'

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const {cart,actions} = useContext(Context)

 

  const handleStripeCheckout = async () => {
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

  if (!stripe || !elements) {
    // Stripe is not ready yet.
    return;
  }

  const cardElement = elements.getElement(CardElement);
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });



  if (error) {
    console.log('Payment error:', error);
    // Handle the error, show a toast message, or update the UI accordingly.
  } else {
    //const data = await re
    console.log('Payment successful!', paymentMethod);
   
    // The payment was successful. You can now proceed with further actions like sending the payment information to the server for order processing.
    // For this frontend implementation, we won't complete the payment flow, as it requires server-side handling as well.
    // Instead, you can show a success message to the user or redirect them to a success page.
    toast.success('Payment successful! Thank you for your purchase.');
    actions({ type: "setShowPayment", payload: false });
    actions({ type: "setShowCart", payload: false });
    const emptyCart = []
    actions({ type: "setCart", payload:{ newCartItems:emptyCart} })
     actions({ type: "setQty", payload:0 })
  }
  };

  const handleShowPayment = () =>{
    actions({ type: "setShowPayment", payload: false });
  }

  return (
    <div className="payment-container">
      <div className='top-container'>
      <h2>Payment Information</h2>
     <span className='cancel-payment-icon'
     onClick={handleShowPayment} >
      <TiDeleteOutline/></span> 
      </div>
  
      <div className="card-element-container">
        {/* Render the CardElement to collect payment information */}
        <CardElement  />
      </div>
     
      <div className="additional-fields">
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" />
      </div>


      {/* Render the "Pay with Stripe" button to initiate Stripe Checkout */}
      <button type="button" className="pay-button" onClick={handleStripeCheckout}>
        Pay with Stripe
      </button>
    </div>
  );
};




export default PaymentForm;
