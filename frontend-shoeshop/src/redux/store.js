import {createStore,combineReducers,applyMiddleware} from"redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailReducer, productListReducer } from "./reducer/ProductReducer"
import {  cartReducer } from "./reducer/cartReducer"
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducer/userReducer.js"
import {  orderDetailsReducer, orderPayReducer, orderRducer } from "./reducer/orderReducer"
const reducer=combineReducers({
    listproduct: productListReducer,
    singleproduct:productDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userregister:userRegisterReducer,
    userdetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderRducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer
})
const cartItemsFromLocalStorage=localStorage.getItem("cartItems")
?JSON.parse(localStorage.getItem("cartItems")):[]
//login
const useFromLocalStorage=localStorage.getItem("userInfo")
?JSON.parse(localStorage.getItem("userInfo")):null
//shippingAddres
const shippingAdressFromLocalStorage=localStorage.getItem("shippingAddress")
?JSON.parse(localStorage.getItem("shippingAddress")):{}


const initialState={
    cart:{
        cartItems:cartItemsFromLocalStorage,
        shippingAddress:shippingAdressFromLocalStorage
    },  
    userLogin:{userInfo:useFromLocalStorage}
}

const middleware=[thunk]
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store