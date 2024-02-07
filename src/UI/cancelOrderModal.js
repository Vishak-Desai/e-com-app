import './cancelOrderModal.css';
import video from '../utils/58412-cross-close-cancel-icon-animation.mp4';
import { useDispatch } from 'react-redux';

const CancelOrderModal = (props) => {
    const dispatch = useDispatch();

    return (
        <div className='cancelOrderModal'>
            <div className="orderOverlayModal"></div>
            <div className="cancelOrdermodal-holder">
                <video className='orderVideo' width="200px" height="200px" loop="true" autoplay="true" src={video}/>
                <p className='orderTextModal'>Are you Sure?</p>
                    <div className='orderButtonGroup'>
                        <button className='cancelModal' onClick={() => {dispatch({type: 'ORDERCANCELLED', payload: props.cancelOrderId})}}>Cancel</button>
                        <button className='dontCancelModal' onClick={() => {dispatch({type: 'ORDERNOTCANCELLED'})}}>dont't Cancel</button>
                    </div>
            </div> 
        </div>
        
    )
}

export default CancelOrderModal;