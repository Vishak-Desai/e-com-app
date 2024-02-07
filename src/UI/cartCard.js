import './cartCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const CartCard = () => {
    const cartData = useSelector(state => state.cartData);
    const dispatch = useDispatch();
    const totalCart = useSelector(state => state.totalCart);
    const resultPrice = useSelector(state => state.resultPrice);
    const orderPlaced = useSelector(state => state.orderPlaced);

    orderPlaced ? disableBodyScroll(document) : enableBodyScroll(document);

  return (
    <div className='cartList'>
        <div className='cartHead'>
            <span className='name'>Your Cart</span>
            {cartData.length > 0 &&<button className='clearCart' onClick={() => {dispatch({type: 'CLEARCART'})}}>Clear Cart</button>}
        </div>
        
        <div className='cartHolder'>
            {cartData.map(cart => 
                <div className='cartCard' key={cart.id}> 
                    {cart.noOfSameProducts > 1 && <button className='x' onClick={() => {
                        dispatch({type: 'REMOVEITEMFROMCART', payload: cart.id})
                        dispatch({type: 'TOTALPRICE'})
                    }}>X</button> }
                    <div className='cartProductsImage'>
                        <img className='cartProductsImg' src={cart.img} alt='cart-itemsImage'/>
                    </div>
                    <p className='cartProductsName'>{cart.name}</p>
                    <p className='cartPrice'>&#8377; {cart.price.toLocaleString()}</p>
                    <div className='buttonGroup'>
                        {cart.noOfSameProducts > 1 ? <button className='decItem' onClick={() => {
                            dispatch({type: "REMOVEMOREITEMS", payload: cart.id})
                            dispatch({type: 'REMOVEFORTOTAL', payload: cart.id})
                            dispatch({type: 'TOTALPRICE'})
                        }}>-</button> : <button className='deleteButton' onClick={() => {
                            dispatch({type: "REMOVEMOREITEMS", payload: cart.id})
                            dispatch({type: 'REMOVEFORTOTAL', payload: cart.id})
                            dispatch({type: 'TOTALPRICE'})
                        }}><FontAwesomeIcon icon={faTrash} /></button>}
                        <div className='status'>{cart.noOfSameProducts}</div>
                        <button className='incItem' onClick={() => {
                            dispatch({type: "ADDMOREITEMS", payload: cart.id})
                            dispatch({type: 'ADDFORTOTAL', payload: cart.id})
                            dispatch({type: 'TOTALPRICE'})
                        }}>+</button>
                    </div>
                </div>
            )}
            {cartData.length === 0 && <div className='cartIsEmpty'>Your Cart is Empty!!!</div>} 
        </div>
        {cartData.length > 0 &&         
            <div className='lineAndTotal'>
                <div className='striped-border'></div>
                <div className='calculation'>
                    <span className='total'>Summary</span>
                    <div className='totalCard'>
                        {totalCart.map(data => 
                            <div className='totalDisplay' key={data.id}>
                                <span>{data.noOfSameProducts} &ensp; X &ensp; {data.name} (&#8377; {data.constantPrice.toLocaleString()})</span>
                            </div>
                        )} 
                    </div>         
                </div>
            </div>}
        {cartData.length > 0 &&  <div className='totalDiv'>
                <div className='totalPrice'>Total : &#8377; {resultPrice.toLocaleString()}</div>
                    <button className='orderButton' onClick={() => {
                        totalCart.map(data => 
                            dispatch({type: 'ORDERPLACED', payload: {
                                id: data.id,
                                img: data.img,
                                name: data.name,
                                noOfSameProducts: data.noOfSameProducts,
                                price: data.price
                        }})) 
                    }}>Place Order</button>
            </div>    
        }
    </div> 
  )
}

export default CartCard;