import axios from "axios";
import api from "../Auth";
import {
  ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
  ENABLE_TWO_STEP_AUTHENTICATION_REQUEST,
  ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEND_RESET_PASSWORD_FAILURE,
  SEND_RESET_PASSWORD_REQUEST,
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_VERIFICATION_OTP_FAILURE,
  SEND_VERIFICATION_OTP_REQUEST,
  SEND_VERIFICATION_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_REQUEST,
  VERIFY_RESET_PASSWORD_SUCCESS,
} from "./ActionTypes";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await api.post(`auth/signup`, userData);
    const user = response.data;
    console.log(user);

    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    localStorage.setItem("jwt", user.jwt);

    userData.navigate("/");
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const login = (userData) => async (dispatch) => {  
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await api.post(`auth/login`, userData.data);
    const user = response.data;
    console.log(user);

    dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
    localStorage.setItem("jwt", user.jwt);

    // userData.navigate("/");
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  
  try {
    const response = await api.get(`/api/users/profile`);

    const user = response.data;
    console.log(user);

    dispatch({
      type: GET_USER_SUCCESS, payload: user
    });
    
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.clear();

  dispatch({ type: LOGOUT });
};

export const resetAuthState = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};

export const sendPasswordResetOTP = ({ forgotPasswordTokenRequest }) => async (
  dispatch
) => {
  dispatch({ type: SEND_RESET_PASSWORD_REQUEST });

  try {
    const request = {
      sendTo: forgotPasswordTokenRequest.email,
      verificationType: forgotPasswordTokenRequest.verificationType,
    };
    const response = await api.post(`auth/reset-password/send-otp`, request);

    console.log("reset password send otp : ", response.data);

    dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const verifyPasswordResetOTP = (request) => async (dispatch) => {
  dispatch({ type: VERIFY_RESET_PASSWORD_REQUEST });
  console.log(request);

  try {
    const response = await api.post(
      `auth/users/reset-password/verify-otp`,
      request
    );

    console.log("reset password verify otp : ", response.data);

    dispatch({ type: VERIFY_RESET_PASSWORD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: VERIFY_RESET_PASSWORD_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const sendEnableTwoFactorAuthOTP = () => async (dispatch) => {
  dispatch({ type: ENABLE_TWO_STEP_AUTHENTICATION_REQUEST });

  try {
    const response = await api.post(`verification/EMAIL/send-otp`);

    console.log("send enable two factor auth otp : ", response.data);

    dispatch({
      type: ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
      payload: error.response.data,
    });
    console.log(error);
  }
};

export const verifyEnableTwoFactorAuthOTP = (otp) => async (dispatch) => {
  dispatch({ type: SEND_VERIFICATION_OTP_REQUEST });
  console.log(otp);

  try {
    const response = await api.patch(`enable-two-factor/verify-otp/${otp}`);

    console.log("verify enable two factor auth otp : ", response.data);
    dispatch({
      type: SEND_VERIFICATION_OTP_SUCCESS,
      payload: response.data,
    });
    localStorage.setItem("isTwoFactorAuthVerified", true);
  } catch (error) {
    dispatch({ type: SEND_VERIFICATION_OTP_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

export const verifyTwoFactorAuthOTP = (otp) => async (dispatch) => {
  dispatch({ type: VERIFY_OTP_REQUEST });
  console.log(otp);

  try {
    const response = await api.post(
      `auth/verification/two-factor/verify/${otp}`
    );

    console.log("verify two factor auth otp : ", response.data);

    dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data });

    localStorage.setItem("isTwoFactorAuthVerified", true);
  } catch (error) {
    dispatch({ type: VERIFY_OTP_FAILURE, payload: error.response.data.message });
    localStorage.clear();
    console.log(error);
  }
};
