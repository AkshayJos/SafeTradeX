import {
  ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_TWO_STEP_FAILURE,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_AUTH_STATE,
  SEND_RESET_PASSWORD_FAILURE,
  SEND_RESET_PASSWORD_REQUEST,
  SEND_VERIFICATION_OTP_FAILURE,
  SEND_VERIFICATION_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_SUCCESS,
} from "./ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
  isTwoFactorAuthEnabled: false,
  isTwoFactorAuthVerified: false,
  message : null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case SEND_RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isTwoFactorAuthEnabled: action.payload.twoFactorAuth.enable,
        isTwoFactorAuthVerified:
          localStorage.getItem("isTwoFactorAuthVerified") != null &&
          localStorage.getItem("isTwoFactorAuthVerified"),
      };

    case VERIFY_OTP_SUCCESS:
       return {
        ...state,
        loading: false,
        error: null,
        isTwoFactorAuthEnabled: true,
        isTwoFactorAuthVerified: true,
      };


    case SEND_VERIFICATION_OTP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isTwoFactorAuthEnabled: true,
        isTwoFactorAuthVerified: true,
      };

    case VERIFY_RESET_PASSWORD_SUCCESS:
      return {...state, error : null, loading : null, message : action.payload };

    case VERIFY_OTP_FAILURE:
      return { ...initialState, user: null, loading: false, error: action.payload };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case LOGIN_TWO_STEP_FAILURE:
    case SEND_VERIFICATION_OTP_FAILURE:
    case ENABLE_TWO_STEP_AUTHENTICATION_FAILURE:
    case SEND_RESET_PASSWORD_FAILURE:
    case VERIFY_RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
    case RESET_AUTH_STATE:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
