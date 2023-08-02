import React, {useContext,useState,useRef, useEffect} from 'react'
import Context from '../context/Context'
import { urlFor } from '../lib/client'
import {Link} from 'react-router-dom';
import {Product} from './'
import {FaTrashAlt} from 'react-icons/fa'
import PaymentForm from './PaymentForm';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast'
import {Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'

import '../Styles/cart.css'
import '../Styles/productDetails.css'

function Cart() {

const {cart,qty,showPayment, actions} = useContext(Context)
const [subtotal, setSubtotal] = useState() 
const stripePromise = 
loadStripe('pk_test_51NZWaJFncAM87BhXoWKqVYU4cceBNKyupMIfHe6GaUEioPlW2BUP4QSrG0t0zxLkWihmiyIbPRc8MjKbtMQ3EHrn00OiKFVlnZ');
const cartRef = useRef();
const products=  cart?.newCartItems?.map((item) =>(
      item
));


useEffect(() =>{
  let getSubTotal = 0
   cart?.newCartItems?.forEach((item) =>{
     getSubTotal +=  item.cartProduct.product.price * item.quantity
    setSubtotal(getSubTotal)
  })
 
},[cart])


function decQty(productId){
  const selectedItem = cart?.newCartItems.find(
    item => item.cartProduct.product._id ===productId)
     if(selectedItem){
      selectedItem.quantity -= 1
     }
     const updateQty = qty - 1
  
       actions({ type: "setCart", payload:{...cart, selectedItem} })
       actions({ type: "setQty", payload:updateQty })
}

function incQty(productId){

const selectedItem = cart?.newCartItems.find(
  item => item.cartProduct.product._id ===productId)
   if(selectedItem){
    selectedItem.quantity +=1
   }
   const updateQty = qty + 1

     actions({ type: "setCart", payload:{...cart, selectedItem} })
     actions({ type: "setQty", payload:updateQty })
  }

  function removeItem(productId){
     const selectedItem = cart?.newCartItems.find(item => item.cartProduct.product._id === productId)
     const updateQty = qty - selectedItem.quantity
     const removeSeletedItem = cart?.newCartItems.filter(item => item.cartProduct.product._id !== productId)

    
     actions({ type: "setCart", payload:{...cart, newCartItems: removeSeletedItem} })
     actions({ type: "setQty", payload:updateQty })
  }

const handleShowCart = () =>{
  actions({ type: "setShowCart", payload: false });
}

const handleCheckout =  () =>{
   
  actions({ type: "setShowPayment", payload: true });

}



  return (
    
    <div className="cart-wrapper" ref={cartRef}>
    
    <div className="cart-container">
      <button
      type="button"
      className="cart-heading"
      onClick={handleShowCart}>
        <AiOutlineLeft />
        <span className="heading">Your Cart</span>
        <span className="cart-num-items">({qty} items)</span>
      </button>

      {qty< 1  && (
        <div className="empty-cart">
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty</h3>
          <Link href="/">
            <button
              type="button"
              onClick={handleShowCart}
              className="btn"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
       
      )}
  
      <div className="product-container">
        {cart && products?.map((item) => (
          <div className="product" key={item.cartProduct.product._id}>
            <img src={urlFor(item?.cartProduct.product.image[0])} className="cart-product-image" />
            <div className="item-desc">
              <div className="flex top">
                <h5>{item.cartProduct.product.name}</h5>
                <h4>${item.cartProduct.product.price}</h4>
              </div>
              <div className="flex bottom">
                <div>
                <p className="quantity-desc">
                  <span className="minus"  onClick={() => decQty(item.cartProduct.product._id)}>
                  <AiOutlineMinus />
                  </span>
                  <span className="num" >{item.quantity}</span>
                  <span className="plus" onClick={() => incQty(item.cartProduct.product._id)}>
                    <AiOutlinePlus /></span>
                </p>
                </div>
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => removeItem(item.cartProduct.product._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart?.newCartItems?.length > 0  && (
        <div className="cart-bottom">
          <div className="total">
            <h3>Subtotal:</h3>
            <h3>${subtotal}</h3>
          </div>
        
          <div className="btn-container">
            <button type="button" className="btn" onClick={handleCheckout} >
              Pay with Stripe
            </button>
          </div>
        </div>
      )}
    </div>
    <Elements stripe={stripePromise}>
      {showPayment && <PaymentForm/>}
      </Elements>
  </div>

  )
}

export default Cart