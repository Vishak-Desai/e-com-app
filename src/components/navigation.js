import { NavLink, useLocation } from "react-router-dom";
import "./navigation.css";
import logoImage from '../utils/logo-e-com.png';
import { useSelector, useDispatch } from "react-redux";
import menuIcon from '../utils/menu.png';
import { useState } from "react";
import closeIcon from '../utils/close-icon.png';
import React, { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
    const productsData = useSelector(state => state.productsData);
    const dispatch = useDispatch();
    const [menuClicked, setMenuClicked] = useState(false);
    const [catClicked, setCatClicked] = useState(false);
    const sideNavRef = useRef(null);
    const cartData = useSelector(state => state.cartData);
    const location = useLocation();
    const signedIn = useSelector(state => state.signedIn);

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
            {menuClicked && <div className="overlay"></div>}
            <nav>
                <img className="cartImage" src={logoImage} alt="logo"/>
                <section>
                    {location.pathname !== '/' && <NavLink className='nav-link' exact to='/'>Home</NavLink>}
                    {location.pathname !== '/About' && <NavLink className="nav-link" exact to="/About">About us</NavLink>}
                    {location.pathname !== '/Contact' && <NavLink className="nav-link" exact to="/Contact">Contact us</NavLink>}
                    {location.pathname !== '/About' && location.pathname !== '/Contact' && location.pathname !== '/Cart' && location.pathname !== '/MyOrders' && <NavLink className="category">Categories</NavLink>}  
                    {location.pathname !== '/About' && location.pathname !== '/Contact' && location.pathname !== '/Cart' && location.pathname !== '/MyOrders' && <NavLink className="categories" >
                        <button className="dropdown" onClick={() => dispatch({type: 'SORTMOBILES', payload: productsData})}>Mobiles</button>
                        <button className="dropdown" onClick={() => dispatch({type: 'SORTLAPTOPS', payload: productsData})}>Laptops</button>
                        <button className="dropdown" onClick={() => dispatch({type: 'SORTTV', payload: productsData})}>TV</button>
                        <button className="dropdown" onClick={() => dispatch({type: 'SORTCLOTHES', payload: productsData})}>Clothes</button>
                        <button className="dropdown" onClick={() => dispatch({type: 'SORTFURNITURES', payload: productsData})}>Furnitures</button>
                        <button className="dropdown" onClick={() => dispatch({type: 'SORTALL', payload: productsData})}>All</button>
                    </NavLink>}  
                    {location.pathname !== '/MyOrders' && <NavLink className="nav-link" exact to="/MyOrders">My Orders</NavLink>}   
                    {location.pathname !== '/Cart' && <NavLink className="nav-link" exact to="/Cart">Cart<div className="cartIndicator">{cartData.length}</div><FontAwesomeIcon className="cartIcon" icon={faCartShopping} /></NavLink>} 
                    {!signedIn && <NavLink className="nav-link" exact to="/Sign-in">Sign in</NavLink>}
                    {signedIn && <NavLink className="nav-link" exact to="/" onClick={() => {dispatch({type: 'SIGNEDOUT'})}}>Sign out</NavLink>}
                </section>
                {!menuClicked && <NavLink className="menuIconHolder" onClick={() => {
                    setMenuClicked(true)
                    }}>
                    <img className="menuIcon" src={menuIcon} alt="Menu"/>
                </NavLink>}
                {menuClicked && <NavLink className="closeMobileNav" onClick={() => {
                    setMenuClicked(false)
                    }}>
                    <img className="closeIcon" src = {closeIcon} alt="closeMenu"/>
                </NavLink>}
                {menuClicked &&<div className = 'mobileNav' ref={sideNavRef}>
                    {location.pathname !== '/' && <NavLink className='mobileNav-link' exact to='/'>Home</NavLink>}
                    {location.pathname !== '/About' && <NavLink className="mobileNav-link" exact to="/About" onClick={() => setMenuClicked(false)}>About us</NavLink>}
                    {location.pathname !== '/Contact' && <NavLink className="mobileNav-link" exact to="/Contact" onClick={() => setMenuClicked(false)}>Contact us</NavLink>}
                    {location.pathname !== '/About' && location.pathname !== '/Contact' && location.pathname !== '/Cart' && location.pathname !== '/MyOrders' && <NavLink className="mobileCategory" onClick={() => {
                        setCatClicked(!catClicked)
                        }} exact to="/">Categories</NavLink>}   
                    {catClicked && location.pathname !== '/About' && location.pathname !== '/Contact' && location.pathname !== '/Cart' && location.pathname !== '/MyOrders' && <NavLink className="mobileCategories" >
                        <button className="mobileDropdown" onClick={() => dispatch({type: 'SORTMOBILES', payload: productsData})}>Mobiles</button>
                        <button className="mobileDropdown" onClick={() => dispatch({type: 'SORTLAPTOPS', payload: productsData})}>Laptops</button>
                        <button className="mobileDropdown" onClick={() => dispatch({type: 'SORTTV', payload: productsData})}>TV</button>
                        <button className="mobileDropdown" onClick={() => dispatch({type: 'SORTCLOTHES', payload: productsData})}>Clothes</button>
                        <button className="mobileDropdown" onClick={() => dispatch({type: 'SORTFURNITURES', payload: productsData})}>Furnitures</button>
                        <button className="mobileDropdown" onClick={() => dispatch({type: 'SORTALL', payload: productsData})}>All</button>
                    </NavLink>}     
                    {location.pathname !== '/MyOrders' && <NavLink className="mobileNav-link" exact to="/MyOrders">My Orders</NavLink>} 
                    {location.pathname !== '/Cart' && <NavLink className="mobileNav-link" exact to="/Cart" onClick={() => setMenuClicked(false)}>Cart<div className="mobileCartIndicator">{cartData.length}</div><FontAwesomeIcon className="cartIcon" icon={faCartShopping} /></NavLink>} 
                    {!signedIn && <NavLink className="mobileNav-link" exact to="/Sign-in">Sign in</NavLink>}
                    {signedIn && <NavLink className="mobileNav-link" exact to="/" onClick={() => {dispatch({type: 'SIGNEDOUT'})}}>Sign out</NavLink>}
                </div>}
            </nav>    
        </div>
    );
}

export default Navigation;