import React from 'react'


import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Dashboard1 from './pages/Dashboard1/Dashboard1';
import AddRestaurant from "./pages/AddRestaurant/AddRestaurant";
import ManageInventory from "./pages/ManageInventory/ManageInventory";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageDishes from './pages/ManageDishes/ManageDishes';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url}/>} />
         <Route path='/dashboard1' element={<Dashboard1 url={url} />} />
          <Route path='/orders' element={<Orders url={url}/>} />
          <Route path='/dashboard1' element={<Dashboard1 url={url} />} />
           <Route path='/list' element={<List url={url}/>} />

           <Route path="/add-restaurant" element={<AddRestaurant url={url} />} />
          <Route path="/manage-inventory" element={<ManageInventory url={url} />} />
          <Route path="/" element={<Dashboard url={url} />} />
          <Route path="/manage-dishes" element={<ManageDishes url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App