import api from "../Auth";
import {
  ADD_PAYMENT_DETAILS_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_FAILURE,
  GET_PAYMENT_DETAILS_REQUEST,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_WITHDRAWAL_FAILURE,
  GET_WITHDRAWAL_HISTORY_FAILURE,
  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_REQUEST,
  GET_WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_PROCEED_FAILURE,
  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
} from "./ActionType";

export const withdrawalRequest = ({ amount }) => async (dispatch) => {
  dispatch({ type: WITHDRAWAL_REQUEST });
  try {
    const response = await api.post(`/api/withdrawal/${amount}`, null);

    console.log("withdrawal : ", response.data);
    dispatch({ type: WITHDRAWAL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: WITHDRAWAL_FAILURE,
      payload: error.response.data,
    });
  }
};

export const proceedWithWithdrawal = ({ id, accept }) => async (dispatch) => {
  dispatch({ type: WITHDRAWAL_PROCEED_REQUEST });
  try {
    const response = await api.patch(
      `/api/admin/withdrawal/${id}/proceed/${accept}`,
      null
    );

    console.log("proceed withdrawal : ", response.data);
    dispatch({ type: WITHDRAWAL_PROCEED_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: WITHDRAWAL_PROCEED_FAILURE,
      payload: error.response.data,
    });
  }
};

export const getWithdrawalHistory = () => async (dispatch) => {
  dispatch({ type: GET_WITHDRAWAL_HISTORY_REQUEST });
  try {
    const response = await api.get(`/api/withdrawal`);

    console.log("get withdrawal history : ", response.data);
    dispatch({ type: GET_WITHDRAWAL_HISTORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_WITHDRAWAL_HISTORY_FAILURE,
      payload: error.response.data,
    });
  }
};

export const getAllWithdrawalRequest = () => async (dispatch) => {
  dispatch({ type: GET_WITHDRAWAL_REQUEST });
  try {
    const response = await api.get(`/api/admin/withdrawal`);

    console.log("get withdrawal request of all users: ", response.data);
    dispatch({ type: GET_WITHDRAWAL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_WITHDRAWAL_FAILURE,
      payload: error.response.data,
    });
  }
};

export const addPaymentDetails = ({ paymentDetails }) => async (dispatch) => {
  dispatch({ type: ADD_PAYMENT_DETAILS_REQUEST });

  try {
    const response = await api.post(`/api/payment-details`, paymentDetails);

    console.log("add payment details : ", response.data);
    dispatch({ type: ADD_PAYMENT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ADD_PAYMENT_DETAILS_FAILURE,
      payload: error.response.data,
    });
  }
};

export const getPaymentDetails = () => async (dispatch) => {
  dispatch({ type: GET_PAYMENT_DETAILS_REQUEST });
  try {
    const response = await api.get(`/api/payment-details`);

    console.log("get payment details : ", response.data);
    dispatch({ type: GET_PAYMENT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_PAYMENT_DETAILS_FAILURE,
      payload: error.response.data,
    });
  }
};
