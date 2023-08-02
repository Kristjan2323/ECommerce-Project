import React from 'react'
import '../Styles/footBanner.css'
import Laptop from '../Images/monitor1.png'

function FooterBaner() {
  return (
    <div className='fb-container'>
     <div className='fb-left-conatiner start'>
      <p className='fb-offSale'>20% off</p>
      <h1 className='fb-Moto'>Big Text</h1>
      <p className='fb-TillDate'>Till date</p>
     </div>
     <div className='fb-middle-container middle'>
        <img src={Laptop}  className='fb-image'/>
     </div>
     <div className='fb-right-container end'>
      <p className=' fb-right-moto'>Right Moto</p>
      <h1 className='fb-season'>Which season sale</h1>
      <p className='fb-description'>Description</p>
      <button type='button' className='fb-button'>Button text</button>
     </div>
    </div>
  )
}

export default FooterBaner