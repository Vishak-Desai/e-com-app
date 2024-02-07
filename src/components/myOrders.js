import Navigation from "./navigation";
import './myOrders.css';
import { useSelector, useDispatch } from "react-redux";
import CancelOrderModal from "../UI/cancelOrderModal";
import { useEffect, useState } from "react";
import { disableBodyScroll } from 'body-scroll-lock';

const MyOrders = () => {
    const myOrdersCart = useSelector(state => state.myOrdersCart);
    const dispatch = useDispatch();
    const cancelOrderClicked = useSelector(state => state.cancelOrderClicked);
    const [cancelOrderId, setCancelOrderId] = useState(null);

    useEffect(() => {
        cancelOrderClicked && disableBodyScroll(document);
    }, [cancelOrderClicked])

    return (
        <div className="myOrders">
            <Navigation/>
            {cancelOrderClicked && <CancelOrderModal cancelOrderId={cancelOrderId}/>}
            <div className="orderHolder">
                <span className="orderText">My Orders</span>
                <div className="orderTable">
                    {myOrdersCart.map(cart => {
                        return (
                            <div key={cart.id} className="productOrder">
                                <img src={cart.img} alt="product" className="orderImg"/>
                                <div className="orderData">
                                    <p className="orderName">{cart.name}</p>
                                    <p className="orderQuantity">Quantity :&ensp; {cart.noOfSameProducts}</p>
                                    <p className="amount">Amount Paid :&ensp;<p>&#8377;{cart.price.toLocaleString()}</p></p>
                                    <p className="orderStatus">Status: &ensp;<p>order Placed</p></p>
                                    <p className="woohoo"> woohoo, Package on the way!!!</p>
                                </div>
                                <button className="cancelButton" onClick={() => {
                                    dispatch({type: 'CANCELORDER'})
                                    setCancelOrderId(cart.id) 
                                }}>Cancel Order</button>
                            </div>
                        )
                    })}
                </div>  
                {myOrdersCart.length === 0 && <div className='myOrdersIsEmpty'>Currently there are no Orders!!!</div>}
            </div>
        </div>
    );
}

export default MyOrders;