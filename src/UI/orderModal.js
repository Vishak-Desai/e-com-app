import video from '../utils/376-check-mark.mp4';
import './orderModal.css';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

const OrderModal = () => {
    const dispatch = useDispatch();
    

    return (
        <div className="modal-holder">
            <div className="overlayModal"></div>
            <video className='video' width="200px" height="200px" loop="true" autoplay="true" src={video}/>
            <p className='textModal'>Order Placed!!!</p>
            <div className='modalButtonGroup'>
                <NavLink className='menuLink' exact to='/'>
                    <button className='goToMenu' onClick={() => {
                        dispatch({type: 'CLEARCART'}) 
                        dispatch({type: 'MODALBUTTONSCLICKED'})   
                    }}>Go to Menu</button>
                </NavLink>
                <NavLink className='orderLink' exact to='/MyOrders'>
                    <button className='goToOrders' onClick={() => {
                        dispatch({type: 'CLEARCART'}) 
                        dispatch({type: 'MODALBUTTONSCLICKED'})   
                    }}>Go to My Orders</button>
                </NavLink>
            </div>
        </div>
    );
}

export default OrderModal;