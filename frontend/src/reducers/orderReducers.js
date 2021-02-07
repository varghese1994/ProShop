import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {},action)=>{
    const {type,payload,error} = action
    switch(type){
        case ORDER_CREATE_REQUEST:
            return{
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return{
                loading: false,
                success: true,
                order: payload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading: false,
                error: error
            }
        default:
            return state
    }
}

export const orderDetailReducer = (state = {loading: true,orderItems:[],shippingAddress:{}},action)=>{
    const {type,payload,error} = action
    switch(type){
        case ORDER_DETAIL_REQUEST:
            return{
                ...state,
                loading: true
            }
        case ORDER_DETAIL_SUCCESS:
            return{
                loading: false,
                order: payload
            }
        case ORDER_DETAIL_FAIL:
            return{
                loading: false,
                error: error
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {},action)=>{
    const {type,error} = action
    switch(type){
        case ORDER_PAY_REQUEST:
            return{
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return{
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return{
                loading: false,
                error: error
            }
        case ORDER_PAY_RESET:
            return{}
        default:
            return state
    }
}

export const orderMyListReducer = (state = {orders:[]},action)=>{
    const {type,error,payload} = action
    switch(type){
        case ORDER_MY_LIST_REQUEST:
            return{
                loading: true
            }
        case ORDER_MY_LIST_SUCCESS:
            return{
                loading: false,
                orders: payload
            }
        case ORDER_MY_LIST_FAIL:
            return{
                loading: false,
                error: error
            }
        case ORDER_MY_LIST_RESET:
            return{
                orders:[]
            }
        default:
            return state
    }
}

export const orderListReducer = (state = {orders:[]},action)=>{
    const {type,error,payload} = action
    switch(type){
        case ORDER_LIST_REQUEST:
            return{
                loading: true
            }
        case ORDER_LIST_SUCCESS:
            return{
                loading: false,
                orders: payload
            }
        case ORDER_LIST_FAIL:
            return{
                loading: false,
                error: error
            }
        case ORDER_LIST_RESET:
            return{
                orders:[]
            }
        default:
            return state
    }
}

export const orderDeliverReducer = (state = {},action)=>{
    const {type,error} = action
    switch(type){
        case ORDER_DELIVER_REQUEST:
            return{
                loading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return{
                loading: false,
                success: true
            }
        case ORDER_DELIVER_FAIL:
            return{
                loading: false,
                error: error
            }
        case ORDER_DELIVER_RESET:
            return{}
        default:
            return state
    }
}
