import axios from 'axios'
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
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
} from '../constants/orderConstants'

export const paymentOrderCreate = (order) => async (dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })
        const {userLogin:{userInfo}} = getState()
    
        const confg = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.post('/api/orders',order,confg)
        
     
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetail = (id) => async (dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_DETAIL_REQUEST,
        })
        const {userLogin:{userInfo}} = getState()
    
        const confg={
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`,confg)
        
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ORDER_DETAIL_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (orderId,paymentResult) => async (dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })
        const {userLogin:{userInfo}} = getState()
    
        const confg={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,confg)
        
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        dispatch({
            type:ORDER_PAY_RESET
        })
    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMyOrders = () => async (dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_MY_LIST_REQUEST,
        })
        const {userLogin:{userInfo}} = getState()
    
        const confg={
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.get('/api/orders/myorders',confg)
        
        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ORDER_MY_LIST_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listOrdersByAdmin = () => async (dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        })
        const {userLogin:{userInfo}} = getState()
    
        const confg={
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.get('/api/orders',confg)
        
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ORDER_LIST_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deliverOrderByAdmin = (order) => async (dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        })
        const {userLogin:{userInfo}} = getState()
    
        const confg={
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.put(`/api/orders/${order._id}/deliver`,{},confg)
        
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })
        dispatch({
            type:ORDER_DELIVER_RESET
        })
    } catch (error) {
        dispatch({
            type:ORDER_DELIVER_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
