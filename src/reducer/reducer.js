const initialState = {
    productsData: [],
    sortedData: [],
    sortClicked: false,
    cartData: [],
    individualCart: [],
    totalCart: [],
    resultPrice: 0,
    orderPlaced: false, 
    myOrdersCart: [],
    cancelOrderClicked: false,
    signedIn: false
}

const reducer = ( state = initialState, action) => {

    switch(action.type){
        case 'STOREDATA':
            return {...state, productsData: action.payload}

        case 'SORTMOBILES':
            const resultMobile = action.payload.filter((data) => data.type === 'mobile')
            return {...state, sortedData: resultMobile, sortClicked: true}

        case 'SORTLAPTOPS':
            const resultLaptop = action.payload.filter((data) => data.type === 'laptop')
            return {...state, sortedData: resultLaptop, sortClicked: true}
        
        case 'SORTTV':
            const resultTv = action.payload.filter((data) => data.type === 'tv')
            return {...state, sortedData: resultTv, sortClicked: true}
    
        case 'SORTCLOTHES':
            const resultCloth = action.payload.filter((data) => data.type === 'cloth')
            return {...state, sortedData: resultCloth, sortClicked: true}
        
        case 'SORTFURNITURES':
            const resultFurniture = action.payload.filter((data) => data.type === 'furniture')
            return {...state, sortedData: resultFurniture, sortClicked: true}
        
        case 'SORTALL':
            return {...state, sortClicked: false}
        
        case 'ADDTOCART':
            let resultCart = [...state.cartData];
            const index = resultCart.findIndex(obj => obj.id === action.payload.id);
            if(index === -1){
                resultCart.push(action.payload);
            }
            return {...state, cartData: resultCart}

        case 'ADDMOREITEMS':   
            let addItemCart = [...state.cartData]
            const indexOfAddedItem = addItemCart.findIndex(index => index.id === action.payload);
            addItemCart[indexOfAddedItem].noOfSameProducts =  addItemCart[indexOfAddedItem].noOfSameProducts + 1   
            return {...state, cartData: addItemCart}

        case 'REMOVEMOREITEMS':    
            let removeItemCart = [...state.cartData]
            const indexOfRemovedItem = removeItemCart.findIndex(index => index.id === action.payload);
            removeItemCart[indexOfRemovedItem].noOfSameProducts =  removeItemCart[indexOfRemovedItem].noOfSameProducts - 1 
            let finalRemovedCart = removeItemCart.filter(data => data.noOfSameProducts !== 0)

            return {...state, cartData: finalRemovedCart}

        case 'TOTAL':
            let addCart = [...state.totalCart];
            const addIndex = addCart.findIndex(obj => obj.id === action.payload.id)
            if(addIndex === -1){
                addCart.push(action.payload);
            } 
            
            return{...state, totalCart: addCart}

        case 'ADDFORTOTAL':   
            let individualAddCart = [...state.totalCart]
            const indexAddIndividual = individualAddCart.findIndex(index => index.id === action.payload);
            individualAddCart[indexAddIndividual].noOfSameProducts = individualAddCart[indexAddIndividual].noOfSameProducts + 1
            individualAddCart[indexAddIndividual].price = individualAddCart[indexAddIndividual].constantPrice * individualAddCart[indexAddIndividual].noOfSameProducts 

            return{...state, totalCart: individualAddCart}

        case 'REMOVEFORTOTAL':    
            let individualRemoveCart = [...state.totalCart]
            const indexRemoveIndividual = individualRemoveCart.findIndex(index => index.id === action.payload);
            individualRemoveCart[indexRemoveIndividual].noOfSameProducts = individualRemoveCart[indexRemoveIndividual].noOfSameProducts - 1
            individualRemoveCart[indexRemoveIndividual].price = individualRemoveCart[indexRemoveIndividual].constantPrice * individualRemoveCart[indexRemoveIndividual].noOfSameProducts 
            let finalIndividualRemovedCart = individualRemoveCart.filter(data => data.noOfSameProducts !== 0)

            return{...state, totalCart: finalIndividualRemovedCart}

        case 'TOTALPRICE':
            let finalCart = [...state.totalCart];
            let finalPrice = finalCart.reduce((a,v) => a = a + v.price, 0)

            return{...state, resultPrice: finalPrice}

        case 'REMOVEITEMFROMCART':
            let removeCart = [...state.cartData];
            let xCart = removeCart.filter(data => data.id !== action.payload)

            let removeTotalCart = [...state.totalCart];
            let xTotalCart = removeTotalCart.filter(data => data.id !== action.payload)

            return{...state, cartData: xCart, totalCart: xTotalCart}

        case 'CLEARCART':
            return{...state, cartData: [], totalCart: []}

        case 'ORDERPLACED': 
            let myOrderCart = [...state.myOrdersCart];
            myOrderCart.push(action.payload)

            return{...state, orderPlaced: true, myOrdersCart: myOrderCart}

        case 'MODALBUTTONSCLICKED':
            return{...state, orderPlaced: false}

        case 'CANCELORDER':
            return{...state, cancelOrderClicked: true}

        case 'ORDERCANCELLED':
            let cancelOrderCart = [...state.myOrdersCart]
            let cancelButtonCart = cancelOrderCart.filter(data => data.id !== action.payload)
            return{...state, cancelOrderClicked: false, myOrdersCart: cancelButtonCart}

        case 'ORDERNOTCANCELLED':
            return{...state, cancelOrderClicked: false}

        case 'SIGNEDIN':
            return{...state, signedIn: true}

        case 'SIGNEDOUT':
            return{...state, signedIn: false}

        default:
            return {...state}
    }   
}

export default reducer;