import {
    FETCH_CLASS,
    UPDATE_CLASS,
    ADD_CLASS,
    DELETE_CLASS,
    FETCH_CLASS_SUCCESS,
    UPDATE_CLASS_SUCCESS,
    ADD_CLASS_SUCCESS,
    DELETE_CLASS_SUCCESS,
    CLASS_OPERATION_FAILURE,
    CLASS_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchClass = () => ({ type: FETCH_CLASS });
export const setSuccessFalseClass = () => ({ type: CLASS_SET_SUCCESS_FALSE });
export const updateClass = updatedClass => ({ type: UPDATE_CLASS, payload: updatedClass });
export const addClass = newClass => ({ type: ADD_CLASS, payload: newClass });
export const deleteClass = id => ({ type: DELETE_CLASS, payload: id });
export const fetchClassSuccess = classDetails => ({ type: FETCH_CLASS_SUCCESS, payload: classDetails });
export const updateClassSuccess = updatedClass => ({ type: UPDATE_CLASS_SUCCESS, payload: updatedClass });
export const addClassSuccess = newClass => ({ type: ADD_CLASS_SUCCESS, payload: newClass });
export const deleteClassSuccess = () => ({ type: DELETE_CLASS_SUCCESS });
export const classOperationFailure = error => ({ type: CLASS_OPERATION_FAILURE, payload: error });
