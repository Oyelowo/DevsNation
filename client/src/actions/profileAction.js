import axios from 'axios';
import {
    PROFILE_LOADING,
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS
} from './types';

// Get currentprofile


export const getCurrentProfile = () => async dispatch => {
    dispatch(setProfileLoading());
    try {
        const response = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILE,
            payload: response.data
        })
    } catch (error) {
        // Not using errors.response.data to get error.
        // This will cause the user to be taken to a place where she/he cann create profile
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }

}


// Create Profile
export const createProfile = (profileData, history) => async dispatch => {
    try {
        await axios.post('/api/profile', profileData);
        history.push('/dashboard');
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}


// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


// Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}