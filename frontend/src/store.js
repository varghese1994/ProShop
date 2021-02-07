import {createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

//reducers
import {productListReducer,productDetailReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productTopRatedReducer} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducer'
import {userLoginReducer,userRegisterReducer,userDetailReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/userReducer'
import {orderCreateReducer,orderDetailReducer,orderPayReducer,orderMyListReducer,orderListReducer,orderDeliverReducer} from './reducers/orderReducers'

const reducer = combineReducers({

    productList: productListReducer,
    productDetail:productDetailReducer,
    productDelete:productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: productReviewCreateReducer,
    productRated: productTopRatedReducer,

    cart: cartReducer,
    
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList: userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    orderList:orderListReducer,
    orderDeliver: orderDeliverReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
  }
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store