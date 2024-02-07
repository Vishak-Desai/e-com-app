import './productsCard.css';
import { useSelector, useDispatch } from 'react-redux';


const ProductsCard = () => {
    const sortedData= useSelector(state => state.sortedData);
    const productsData = useSelector(state => state.productsData);
    const cartData = useSelector(state => state.cartData);
    const sortClicked = useSelector(state => state.sortClicked);
    const dispatch = useDispatch();
   
    let cartResult = cartData
    let noOfSameProducts = 1;

    const sortedProducts = sortedData.map((product) => {
        const indexOfCart = cartResult.findIndex(obj => obj.id === product.id);
        return(
        <div className='card' key={product.id}>   
            <div className='productsImage'>
                <img className='productsImg' src={product.img} alt='itemsImage'/>
            </div>
            <p className='productsName'>{product.name}</p>
            <p className='price'>&#8377; {product.price.toLocaleString()}</p>
            {indexOfCart === -1 ? <button className='addToCartButton' onClick={() => {
                    dispatch({type:'ADDTOCART', payload: {
                        id: product.id,
                        img: product.img,
                        name: product.name,
                        price: product.price,
                        noOfSameProducts,
                        }});
                    dispatch({type:'TOTAL', payload: {
                        id: product.id,
                        img: product.img,
                        name: product.name,
                        price: product.price,
                        noOfSameProducts,
                        constantPrice: product.price
                        }});
                        dispatch({type: 'TOTALPRICE'})
                    }     
                }
                >Add to Cart</button> : <button className='addToCartClicked' disabled={true}>Added to Cart</button>}
        </div>
    )})

    const products = productsData.map((product) => {
        const indexOfCart = cartResult.findIndex(obj => obj.id === product.id);
         return(
            <div className='card' key={product.id}>  
                <div className='productsImage'>
                    <img className='productsImg' src={product.img} alt='itemsImage'/>
                </div>
                <p className='productsName'>{product.name}</p>
                <p className='price'>&#8377; {product.price.toLocaleString()}</p>                    
                {indexOfCart === -1 ? <button className='addToCartButton' onClick={() => {
                    dispatch({type:'ADDTOCART', payload: {
                        id: product.id,
                        img: product.img,
                        name: product.name,
                        price: product.price,
                        noOfSameProducts
                        }});
                    dispatch({type:'TOTAL', payload: {
                        id: product.id,
                        img: product.img,
                        name: product.name,
                        price: product.price,
                        noOfSameProducts,
                        constantPrice: product.price
                        }});
                    dispatch({type: 'TOTALPRICE'})
                }    
                }
                >Add to Cart</button> : <button className='addToCartClicked' disabled={true}>Added to Cart</button>}
            </div>
    )})
    

    return(
        <div className='productsList'>
            <span className='product'>Products</span>
            <div className='card-holder'>
                {sortClicked ? sortedProducts : products}
                {products.length === 0 && <p className='loading-products'>Loading Products...</p>}
            </div>
        </div>  
    )
}
 

export default ProductsCard;