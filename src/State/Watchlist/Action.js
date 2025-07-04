import api from "../Auth";
import { ADD_COIN_TO_WATCHLIST_FAILURE, ADD_COIN_TO_WATCHLIST_REQUEST, ADD_COIN_TO_WATCHLIST_SUCCESS, GET_USER_WATCHLIST_FAILURE, GET_USER_WATCHLIST_REQUEST, GET_USER_WATCHLIST_SUCCESS } from "./ActionTypes";

export const getUserWatchlist = () => async(dispatch) =>{
    dispatch({type : GET_USER_WATCHLIST_REQUEST})

    try {
        const response = await api.get("/api/watchlist/user");

        dispatch({
            type : GET_USER_WATCHLIST_SUCCESS,
            payload : response.data
        })

        console.log("get user watchlist : ", response.data);

    } catch (error) {
        console.log(error);
        dispatch({
            type : GET_USER_WATCHLIST_FAILURE,
            payload : error.response.data
        })
    }
}

export const addItemToWatchlist = ({coinId}) => async(dispatch) =>{
    dispatch({type : ADD_COIN_TO_WATCHLIST_REQUEST})

    try {
        const response = await api.patch(`/api/watchlist/add/coin/${coinId}`);

        dispatch({
            type : ADD_COIN_TO_WATCHLIST_SUCCESS,
            payload : response.data
        })

        console.log("added item to watchlist : ", response.data);

    } catch (error) {
        console.log(error);
        dispatch({
            type : ADD_COIN_TO_WATCHLIST_FAILURE,
            payload : error.response.data
        })
    }
}