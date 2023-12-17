import React from 'react'

import '../Styles/product.css'

import {client} from '../lib/client'
import { NavBar, HeroBanner,Product,Footer,FooterBanner,
Layout,Cart } from '../Components';



function Home() {
 

  const [products, setProducts] = React.useState([])
  const [heroBanner,setHeroBanner] = React.useState([])

  
  React.useEffect(() => {
      const getServerSideData = async () => {
        const query = '*[_type=="product"]';
        const fetchedProducts = await client.fetch(query);
        const queryBanner = '*[_type=="banner"]';
        const bannerData = await client.fetch(queryBanner)
        setHeroBanner(bannerData)
        setProducts(fetchedProducts);
        
      };
    
      getServerSideData();
    }, []);
     
    const herBannerElement = heroBanner.map((hb,i) => (
      <HeroBanner key={i} heroBanner = {hb} />
    ))

    const productElement = products.map((product )=> (
      <Product key={product._id}
               product = {product}
       />
    ))
   
  return (


       <div className='app-conainter' >
      
       {herBannerElement}
     
        <div className='hero-banner-container'>
      
        <h1 className='hero-banner-tittle'>Most saled products</h1>
        <div className='products-container '>
          
          {productElement}
          </div>
        </div>    
        <FooterBanner/>
     
    </div>
 
  );
 
}



export default Home;
