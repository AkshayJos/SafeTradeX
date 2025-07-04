import { DEPOSIT_MONEY_FAILURE, DEPOSIT_MONEY_REQUEST, DEPOSIT_MONEY_SUCCESS, GET_USER_WALLET_FAILURE, GET_USER_WALLET_REQUEST, GET_USER_WALLET_SUCCESS, GET_WALLET_TRANSACTION_FAILURE, GET_WALLET_TRANSACTION_REQUEST, GET_WALLET_TRANSACTION_SUCCESS, TRANSFER_MONEY_FAILURE, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS } from "./ActionTypes"
import api from "../Auth";

export const getUserWallet = () => async(dispatch) =>{
    dispatch({type : GET_USER_WALLET_REQUEST})

    try {
        const response = await api.get("/api/wallet");

        dispatch({
            type : GET_USER_WALLET_SUCCESS,
            payload : response.data
        })

        console.log(response.data);

    } catch (error) {
        console.log(error);
        dispatch({
            type : GET_USER_WALLET_FAILURE,
            payload : error.response.data
        })
    }
}

export const getWalletTransactions = () => async(dispatch) =>{
    dispatch({type : GET_WALLET_TRANSACTION_REQUEST});

    try {
        const response = await api.get("/api/transactions");

        dispatch({
            type : GET_WALLET_TRANSACTION_SUCCESS,
            payload : response.data
        })
        
        console.log(response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type : GET_WALLET_TRANSACTION_FAILURE,
            payload : error.response.data
        })
    }
}

export const depositMoney = ({orderId, paymentReferenceId, navigate}) => async(dispatch) =>{
    dispatch({type : DEPOSIT_MONEY_REQUEST})

    try {
        const response = await api.put("/api/wallet/deposite", null, {
            params : {
                order_id : orderId,
                payment_id : paymentReferenceId
            }
        });

        dispatch({
            type : DEPOSIT_MONEY_SUCCESS,
            payload : response.data
        })
        
        console.log(response.data);
        navigate("/wallet");
    } catch (error) {
        console.log(error);
        dispatch({
            type : DEPOSIT_MONEY_FAILURE,
            payload : error.response.data
        })
    }
}

export const paymentHandler = ({amount, paymentMethod}) => async(dispatch) =>{
    dispatch({type : DEPOSIT_MONEY_REQUEST})
   
    try {
        const response = await api.post(`/api/payment/${paymentMethod}/amount/${amount}`, null);
        window.location.href = response.data.paymentUrl;

        // dispatch({
        //     type : DEPOSIT_MONEY_SUCCESS,
        //     payload : response.data
        // })
    } catch (error) {
        console.log(error);
        dispatch({
            type : DEPOSIT_MONEY_FAILURE,
            payload : error.response.data
        })
    }
}

export const transferMoney = ({walletId, reqData}) => async(dispatch) =>{
    dispatch({type : TRANSFER_MONEY_REQUEST});

    try {
        const response = await api.put(`/api/wallet/${walletId}/transfer`, reqData  );

        dispatch({
            type : TRANSFER_MONEY_SUCCESS,
            payload : response.data
        })
        
        console.log(response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type : TRANSFER_MONEY_FAILURE,
            payload : error.response.data
        })
    }
}