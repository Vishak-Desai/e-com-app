import './App.css';
import React, { useEffect, useState } from 'react';
import Navigation from './components/navigation';
import Slider from './UI/slider';
import Products from './components/products';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Copyright from './components/copyright';

function App() {
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState([]);

  const products = async() => {
    await axios.get("http://localhost:3000/productsData")
    .then(response => setProductsData(response.data))
  }

  useEffect(() => {
    products();
  }, [])
  
  dispatch({type: "STOREDATA", payload: productsData})

  return (
    <div className="App">
      <Navigation/>
      <Slider/>
      <Products/>
      <Copyright/>
    </div>
  );
}

export default App;
