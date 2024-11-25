import {
    FETCH_USER,
    UPDATE_USER,
    ADD_USER,
    DELETE_USER,
    FETCH_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    ADD_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    USER_OPERATION_FAILURE,
    USER_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchUser = () => ({ type: FETCH_USER });
export const setSuccessFalseUser = () => ({ type: USER_SET_SUCCESS_FALSE });
export const updateUser = updatedUser => ({ type: UPDATE_USER, payload: updatedUser });
export const addUser = newUser => ({ type: ADD_USER, payload: newUser });
export const deleteUser = id => ({ type: DELETE_USER, payload: id });
export const fetchUserSuccess = userDetails => ({ type: FETCH_USER_SUCCESS, payload: userDetails });
export const updateUserSuccess = updatedUser => ({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
export const addUserSuccess = newUser => ({ type: ADD_USER_SUCCESS, payload: newUser });
export const deleteUserSuccess = () => ({ type: DELETE_USER_SUCCESS });
export const userOperationFailure = error => ({ type: USER_OPERATION_FAILURE, payload: error });
