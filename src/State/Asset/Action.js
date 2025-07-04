import api from "../Auth";
import { GET_ASSET_DETAILS_FAILURE, GET_ASSET_DETAILS_REQUEST, GET_ASSET_DETAILS_SUCCESS, GET_ASSET_FAILURE, GET_ASSET_REQUEST, GET_ASSET_SUCCESS, GET_USER_ASSET_FAILURE, GET_USER_ASSET_REQUEST, GET_USER_ASSET_SUCCESS } from "./ActionTypes";

export const getAssetById = ({assetId}) => async(dispatch) =>{
    dispatch({type : GET_ASSET_REQUEST});

    try {
        const response = await api.get(`/api/assets${assetId}`);

        dispatch({
            type : GET_ASSET_SUCCESS,
            payload : response.data
        })
        
        console.log("get asset By Id : ", response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type : GET_ASSET_FAILURE,
            payload : error.response.data
        })
    }
}

export const getAssetDetails = ({coinId}) => async(dispatch) =>{
    dispatch({type : GET_ASSET_DETAILS_REQUEST});

    try {
        const response = await api.get(`/api/assets/coin/${coinId}/user`);

        dispatch({
            type : GET_ASSET_DETAILS_SUCCESS,
            payload : response.data
        })
        
        console.log("get asset details : ", response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type : GET_ASSET_DETAILS_FAILURE,
            payload : error.response.data
        })
    }
}

export const getUserAssets = () => async(dispatch) =>{
    dispatch({type : GET_USER_ASSET_REQUEST});

    try {
        const response = await api.get(`/api/assets`);

        dispatch({
            type : GET_USER_ASSET_SUCCESS,
            payload : response.data
        })
        
        console.log("get user assets : ", response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type : GET_USER_ASSET_FAILURE,
            payload : error.response.data
        })
    }
}