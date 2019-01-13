import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';

import {
    GET_ERRORS, SET_CURRENT_USER
} from "./types";
import { clearCurrentProfile } from "./profileAction";



// Register User 
export const registerUser = (userData, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", userData);
        history.push('/login')

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }

}


// Login - Get User token
export const loginUser = (userData) => async dispatch => {

    try {
        const response = await axios.post("/api/users/login", userData);
        // Save to local storage
        const {
            token
        } = response.data;
        // Set token to ls
        localStorage.setItem('jwToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }

}



// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// log user iut
export const logoutUser = (history) => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  history.push('./')
}
