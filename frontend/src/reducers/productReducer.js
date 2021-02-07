import {
    PRODUCT_LIST_REQUESTED,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUESTED,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DELETE_REQUESTED,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUESTED,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUESTED,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUESTED,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUESTED,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
} from '../constants/productConstants'

const initialState ={
    products:[],
    product:{
        reviews:[]
    },
    loading: false,
    error:null
}

export const productListReducer = (state = initialState,action) =>{
    const { type, payload } = action
    switch(type){
        case PRODUCT_LIST_REQUESTED:
            return {
                loading: true,
                products: []
            }
        case PRODUCT_LIST_SUCCESS:
        return {
            loading: false,
            products: payload.products,
            pages:payload.pages,
            page:payload.page
        }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.error
        }
        default:
            return state
    }
}

export const productDetailReducer = (state = initialState,action) =>{
    const { type, payload } = action
    switch(type){
        case PRODUCT_DETAIL_REQUESTED:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAIL_SUCCESS:
        return {
            loading: false,
            product: payload
        }
        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.error
        }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {},action) =>{
    const { type,error } = action
    switch(type){
        case PRODUCT_DELETE_REQUESTED:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DELETE_SUCCESS:
        return {
            loading: false,
            success: true
        }
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: error
        }
        default:
            return state
    }
}

export const productCreateReducer = (state = {},action) =>{
    const { type,error,payload } = action
    switch(type){
        case PRODUCT_CREATE_REQUESTED:
            return {
                loading: true,
            }
        case PRODUCT_CREATE_SUCCESS:
        return {
            loading: false,
            success: true,
            product:payload
        }
        case PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: error
        }
        case PRODUCT_CREATE_RESET:
            return{}
        default:
            return state
    }
}

export const productUpdateReducer = (state = {product:{}},action) =>{
    const { type,error,payload } = action
    switch(type){
        case PRODUCT_UPDATE_REQUESTED:
            return {
                loading: true,
            }
        case PRODUCT_UPDATE_SUCCESS:
        return {
            loading: false,
            success: true,
            product:payload
        }
        case PRODUCT_UPDATE_FAIL:
            return {
                loading: false,
                error: error
        }
        case PRODUCT_UPDATE_RESET:
            return{
                product:{}
            }
        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {},action) =>{
    const { type,error } = action
    switch(type){
        case PRODUCT_CREATE_REVIEW_REQUESTED:
            return {
                loading: true,
            }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
        return {
            loading: false,
            success: true,
        }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: error
        }
        case PRODUCT_CREATE_REVIEW_RESET:
            return{}
        default:
            return state
    }
}

export const productTopRatedReducer = (state = {products:[]},action) =>{
    const { type,error,payload } = action
    switch(type){
        case PRODUCT_TOP_REQUESTED:
            return {
                loading: true,
                products:[]
            }
        case PRODUCT_TOP_SUCCESS:
        return {
            loading: false,
            products:payload
        }
        case PRODUCT_TOP_FAIL:
            return {
                loading: false,
                error: error
            }
        default:
            return state
    }
}