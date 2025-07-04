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

const initialState = {
  coinList: [],
  top50: [],
  trendingCoinList : [],
  searchCoinList: [],
  marketChart: { data: [], loading: true, error : null },
  coinById: null,
  coinDetails: null,
  loading: true,
  error: null,
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COIN_BY_ID_REQUEST:
    case FETCH_COIN_DETAILS_REQUEST:
    case SEARCH_COIN_REQUEST: 
      return { ...state, loading: true, error: null };

    case FETCH_TOP_50_COINS_LIST_REQUEST:
      return { ...state, top50: [], loading: true, error: null };

    case FETCH_TRENDING_COINS_LIST_REQUEST:
      return { ...state, trendingCoinList : [], loading: true, error: null };

     case FETCH_COIN_LIST_REQUEST:
      return { ...state, coinList : [], loading: true, error: null };

    case FETCH_MARKET_CHART_REQUEST:
      return {
        ...state,
        marketChart: { loading: true, data: [], error : null },
      };

    case FETCH_COIN_LIST_SUCCESS:
      return {
        ...state,
        coinList: action.payload,
        loading: false,
        error: null,
      };

      case FETCH_TRENDING_COINS_LIST_SUCCESS:
      return {
        ...state,
        trendingCoinList: action.payload.coins,
        loading: false,
        error: null,
      };

    case FETCH_TOP_50_COINS_LIST_SUCCESS:
      return {
        ...state,
        top50: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_MARKET_CHART_SUCCESS:
      return {
        ...state,
        marketChart: { data: action.payload.prices, loading: false, error: null},
      };

    case FETCH_COIN_BY_ID_SUCCESS:
      return {
        ...state,
        coinDetails: action.payload,
        loading: false,
        error: null,
      };

    case SEARCH_COIN_SUCCESS:
      return {
        ...state,
        searchCoinList: action.payload.coins,
        loading: false,
        error: null,
      };

    case FETCH_COIN_DETAILS_SUCCESS:
      return {
        ...state,
        coinDetails: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_MARKET_CHART_FAILURE:
      return {
        ...state,
        marketChart: { data: [], loading: false, error: action.payload },
      };

    case FETCH_COIN_LIST_FAILURE:
      return { ...state,  coinList: [], loading: false, error: action.payload };
      
    case SEARCH_COIN_FAILURE:
      return { ...state,  searchCoinList: [], loading: false, error: action.payload };

    case FETCH_COIN_BY_ID_FAILURE:
      return { ...state,  coinDetails: null, loading: false, error: action.payload };

    case FETCH_COIN_DETAILS_FAILURE:
      return { ...state,  coinDetails: null, loading: false, error: action.payload };

    case FETCH_TOP_50_COINS_LIST_FAILURE:
      return { ...state,  top50: [], loading: false, error: action.payload };

    case FETCH_TRENDING_COINS_LIST_FAILURE:
      return { ...state, trendingCoinList: [], loading: false, error: action.payload };

    case RESET_COIN_STATE:
      return initialState;

    default:
      return state;
  }
};

export default coinReducer;
