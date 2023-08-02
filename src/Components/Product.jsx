import React from 'react'
import '../Styles/product.css'
import {Link} from 'react-router-dom';
import {urlFor} from '../lib/client'
import '../index.css'
import '../App.css';


function Product(props) {
  
  
    const product = props.product
    
  
  return (
    
       <div >
        <Link className='porduct-link' to={`/product/${product.slug.current}`}>
       <div className="product-card">
    
       <img src={urlFor(product.image[0])} 
       width ={200}
       height = {200}
       alt={product.name}
       className="product-image"
       />
       <p className="product-name" >{product.name}</p>
       <p className="product-price">${product.price}</p>
     
       </div>
       </Link>
       </div>
  )
}

export default Product