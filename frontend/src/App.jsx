import React, { useState, useContext } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Restaurants from "./pages/Restaurants/Restaurants";
import { StoreContext } from './components/context/StoreContext';
import RestaurantDishes from "./pages/RestaurantDishes/RestaurantDishes";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const url = "http://localhost:4000"; // Define the API URL

const App = () => {


  const { token } = useContext(StoreContext); // ✅ Ensure StoreContext is imported


  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path="/restaurants" element={<Restaurants url={url} />} />
  <Route path="/restaurant/:restaurantId" element={<RestaurantDishes />} />

      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App