import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { urlFor, client } from "../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import "../Styles/productDetails.css";
import NavBar from "../Components/Navbar";
import Product from "../Components/Product";
import { Footer } from "../Components";
import Context from "../context/Context";
import toast from 'react-hot-toast'

export const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState();
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const image = product?.image[index];
  const { cart,qty, actions } = useContext(Context);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
        const product = await client.fetch(query);

        const queryAllproducts = '*[_type == "product"]';
        const allProducts = await client.fetch(queryAllproducts);
        setProduct(product);
        setProducts(allProducts);

        // Assuming you want to display the first product
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [slug]);

  function CheckIfItemExistInCart() {
    let selectedItem = ""
    if (cart && Array.isArray(cart.newCartItems) && cart.newCartItems.length > 0) {

    //  const itemExist = cart.newCartItems?.some(item => item.cartProduct.product._id === product?._id)
      const itemExist = cart.newCartItems?.some(item => item.cartProduct && item.cartProduct.product && item.cartProduct.product._id === product?._id);


      if(itemExist){
         selectedItem = cart.newCartItems?.find(item => item.cartProduct?.product._id=== product?._id)
      }
    }
    return selectedItem
  }
  

  function CreateCartModel() {
    let selectedQuantity = 0;
   
    if (product === null) {
      return;
    }
    
    const cartModel = {
      cartProduct: {product},
      quantity: quantity,
    };
      
    
    return cartModel;
  }

  

  const addItemToCart = () => {
    const cartModel = CreateCartModel();
   
    // Retrieve the current cart items from the state
    const newCartItems = cart.newCartItems || [];
    
    const existItem = cart.newCartItems?.find(item => item.cartProduct?.product._id === cartModel.cartProduct?.product._id)
    if(existItem){
      existItem.quantity += cartModel.quantity
    }
    else{
      newCartItems.push(cartModel)
    }

    const quantitySumByItem = newCartItems.reduce((quantitySum, item) => {
    
      return quantitySum + item.quantity
    }, 0);
    // Append the new cart item to the existing cart items
   // const newCartItems = [...currentItems, cartModel];
    toast.success(`${quantity} ${cartModel.cartProduct.product.name} added to cart.`);
    // Update the cart state with the updated cart items
    actions({ type: "setCart", payload: { ...cart, newCartItems } });
    actions({ type: "setQty", payload: quantitySumByItem });
   
  };

  useEffect(() => {
    {
      if (cart) {
      //  const productName = cart.cartModel[0]?.cartProduct?.product?.name;
   
        console.log(qty); // Output: Dell-xps-13
      } else {
        console.log("Cart is empty or undefined.");
      }
    }
  }, [cart][quantity]);

  const handleAddItem = () => {
    setQuantity((prevQuantity) => {
      const qty = prevQuantity + 1;
      setQuantity(qty);
    });
  }

  function decQty() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const qty = prevQuantity - 1;
        setQuantity(qty);
      });
    }
  }

  return (
    <div>
      <header>
        <NavBar />
      </header>

      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={image && urlFor(image)}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {product?.image?.map((item, i) => (
              <img
                key={i}
                src={item && urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{product?.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{product?.details}</p>
          <p className="price">${product?.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={handleAddItem}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={addItemToCart}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products?.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getServerSideData = async () => {
  const productsData = '*[_type == "product"]';
  const products = await client.fetch(productsData);

  return {
    props: { products },
  };
};
