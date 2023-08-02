import  { React,useEffect,useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import {client} from '../../../lib/client'
import { useParams } from 'react-router-dom'
import Product from '../../../Components/Product'
import NavBar from '../../../Components/Navbar';
import { Footer } from '../../../Components'
import '../../../Styles/product.css'
import { StateContext } from '../../../context/Context'

const ItemCategory = () => {
  
    const [xProductsCategory, setXProductsCategory] = useState()
    let {category} = useParams()
    const Category = category.charAt(0).toUpperCase() + category.slice(1);

    useEffect(()=>{
        const getServerSideData = async () =>{
          let query
          if(category.toLowerCase()=== 'all'){
            query = '*[_type == "product" ]'
          }
          else{
            query = `*[_type == "product" && category == "${Category}"]`
          }
          
            const products = await client.fetch(query)
            
            setXProductsCategory(products)
        };
        getServerSideData()
    },[category])

  return (

    <div>
          <header>
              <NavBar/>
              </header>
              <h1 className='catgegory-searched'>Search for {Category} {xProductsCategory?.length > 0 ? "" : ": there is no product available"}</h1>
              <div className='products-container'>
       
    {xProductsCategory && xProductsCategory?.map((product)=>
        <Product key = {product._id}  product={product} />
    )}
    </div>
    <Footer/>
    </div>
  )
}

export default ItemCategory