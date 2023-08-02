import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import  '../Styles/heroBanner.css'

import {urlFor} from '../lib/client'

export default function HeroBanner(props){

    return(
        <div className='mainHero'>
        <div className='heroBanner'>
            <h3 className='percentageOff'>{props.name}</h3>
            <h1 className='bannerTitle'>Best offer for a group of products</h1>
            <p className='bannerDetail'>Great speed! Greate performance!</p>
            <button className='heroBannerBtn' type='button'>Start Shopping  <span className='shoppIcon'><FaShoppingCart/></span></button>
          
        </div>
        <div className='heroBannerImage'>
                <img src={urlFor(props.heroBanner.image)} alt = '' />
               
            </div>
        </div> 
    )
}