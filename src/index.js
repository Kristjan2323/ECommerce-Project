import React ,{useContext}from 'react';
import {Toaster} from 'react-hot-toast'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Components/Home'
import Cart from './Components/Cart'
import { ProductDetails  } from './pages/[slug]';
import  ItemCategory  from './pages/product/category/[category]';
import reportWebVitals from './reportWebVitals';
import useGlobalState from '../src/context/useGlobalState'
import Context from '../src/context/Context'




const Index = () => {
  
  
  const store = useGlobalState();
  const {showCart} = useContext(Context)
  return (
    <Context.Provider value={store}>
     
       <Toaster/>
       {showCart && <Cart/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
    
          <Route
            path="/product/category/:category"
            element={<ItemCategory />}
          />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Index/>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
