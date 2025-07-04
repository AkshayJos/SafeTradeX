import {
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_TOP_50_COINS_LIST_FAILURE,
  FETCH_TOP_50_COINS_LIST_REQUEST,
  FETCH_TOP_50_COINS_LIST_SUCCESS,
  FETCH_TRENDING_COINS_LIST_FAILURE,
  FETCH_TRENDING_COINS_LIST_REQUEST,
  FETCH_TRENDING_COINS_LIST_SUCCESS,
  RESET_COIN_STATE,
  SEARCH_COIN_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
} from "./ActionType";
import api from "../Auth";

export const getCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });

  try {
    const response = await api.get(`/coins?page=${page}`);
    const data = response.data;
    console.log("coin list", data);

    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const getTop50CoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COINS_LIST_REQUEST });

  try {
    const response = await api.get(`/coins/top50`);
    const data = response.data;
    console.log("top 50", data);

    dispatch({ type: FETCH_TOP_50_COINS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TOP_50_COINS_LIST_FAILURE,
      payload: error.response.data,
    });
    console.log(error);
  }
};

export const getTrendingCoin = () => async (dispatch) => {
  dispatch({ type: FETCH_TRENDING_COINS_LIST_REQUEST });

  try {
    const response = await api.get(`/coins/trending`);
    const data = response.data;
    console.log("trending : ", data);

    dispatch({ type: FETCH_TRENDING_COINS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TRENDING_COINS_LIST_FAILURE,
      payload: error.response.data,
    });
    console.log(error);
  }
};

export const fetchMarketChart = ({ coinId, days }) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });

  try {
    const response = await api.get(`/coins/${coinId}/chart?days=${days}`);
    const data = response.data;
    console.log("market chart : ", data);

    dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_MARKET_CHART_FAILURE,
      payload: error.response.data,
    });
    console.log(error);
  }
};

export const fetchCoinById = ({ coiniId }) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });

  try {
    const response = await api.get(`/coins/${coiniId}`);
    const data = response.data;
    console.log("coin by id : ", data);

    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const fetchCoinDetails = ({ coinId }) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });

  try {
    const response = await api.get(`/coins/details/${coinId}`);
    const data = response.data;
    console.log("coin details : ", data);

    dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_COIN_DETAILS_FAILURE,
      payload: error.response.data,
    });
    console.log(error);
  }
};

export const searchCoin = ({ keyword }) => async (dispatch) => {
  dispatch({ type: SEARCH_COIN_REQUEST });

  try {
    const response = await api.get(`/coins/search?q=${keyword}`);
    const data = response.data;
    console.log("search coins : ", data);

    dispatch({ type: SEARCH_COIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEARCH_COIN_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const resetCoinState = () => async (dispatch) => {
  dispatch({ type: RESET_COIN_STATE });
};
