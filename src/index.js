import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer/reducer';
import { BrowserRouter } from 'react-router-dom';
import About from './components/about';
import Contact from './components/contact-us';
import Cart from './components/cart';
import { Routes, Route } from 'react-router-dom';
import MyOrders from './components/myOrders';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route exact path="/About" element={<About/>} />
          <Route exact path="/Contact" element={<Contact/>} />
          <Route exact path="/Cart" element={<Cart/>} />
          <Route exact path="/MyOrders" element={<MyOrders/>}/>
          <Route exact path="/Sign-in" element={<SignIn/>}/>
          <Route exact path="/Sign-up" element={<SignUp/>}/>
       </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

