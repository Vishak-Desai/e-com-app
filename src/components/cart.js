import './cart.css';
import "./navigation.css";
import { useState } from "react";
import React, { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import CartCard from '../UI/cartCard';
import OrderModal from '../UI/orderModal';
import { useSelector } from 'react-redux';
import Navigation from './navigation';

const Cart = () => {
    const [menuClicked, setMenuClicked] = useState(false);
    const orderPlaced = useSelector(state => state.orderPlaced);
    const sideNavRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    function handleClickOutside(event) {
        if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
            setMenuClicked(false);
        }
    }

    

    menuClicked ? disableBodyScroll(document) : enableBodyScroll(document)
            
    return (
        <div>
            <Navigation/> 
            <div className='cart'>
                {orderPlaced && <OrderModal/>}
                <CartCard/>
            </div>          
        </div>    
    );
}

export default Cart;