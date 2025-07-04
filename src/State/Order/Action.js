import api from "../Auth";
import { GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, PAY_ORDER_FAILURE, PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS } from "./ActionTypes";

export const payOrder = ({orderData, amount}) => async(dispatch) =>{
    dispatch({type : PAY_ORDER_REQUEST});

    try {
        const response = await api.post(`/api/orders/pay`, orderData);

        dispatch({
            type : PAY_ORDER_SUCCESS,
            payload : response.data
        })
        
        console.log("order success : ", response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type : PAY_ORDER_FAILURE,
            payload : error.response.data
        })
    }
}

export const getOrderById = ({orderType, assetSymbol}) => async(dispatch) =>{
    dispatch({type : GET_ORDER_REQUEST});

    try {
        const response = await api.get(`/api/orders`,{
            params : {
                order_type : orderType,
                asset_symbol : assetSymbol
            }
        });

        dispatch({
            type : GET_ORDER_SUCCESS,
            payload : response.data
        })
        
        console.log("get all order success : ", response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type : GET_ORDER_FAILURE,
            payload : error.response.data
        })
    }
}

export const getAllOrdersForUser = () => async(dispatch) =>{
    dispatch({type : GET_ALL_ORDERS_REQUEST});

    try {
        const response = await api.get(`/api/orders`);

        dispatch({
            type : GET_ALL_ORDERS_SUCCESS,
            payload : response.data
        })
        
        console.log("get all order success : ", response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type : GET_ALL_ORDERS_FAILURE,
            payload : error.response.data
        })
    }
}