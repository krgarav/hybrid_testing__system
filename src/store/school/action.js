import {
    FETCH_SCHOOL,
    UPDATE_SCHOOL,
    ADD_SCHOOL,
    DELETE_SCHOOL,
    FETCH_SCHOOL_SUCCESS,
    UPDATE_SCHOOL_SUCCESS,
    ADD_SCHOOL_SUCCESS,
    DELETE_SCHOOL_SUCCESS,
    SCHOOL_OPERATION_FAILURE,
    SCHOOL_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchSchool = () => ({ type: FETCH_SCHOOL });
export const setSuccessFalseSchool = () => ({ type: SCHOOL_SET_SUCCESS_FALSE });
export const updateSchool = updatedSchool => ({ type: UPDATE_SCHOOL, payload: updatedSchool });
export const addSchool = newSchool => ({ type: ADD_SCHOOL, payload: newSchool });
export const deleteSchool = id => ({ type: DELETE_SCHOOL, payload: id });
export const fetchSchoolSuccess = SchoolDetails => ({ type: FETCH_SCHOOL_SUCCESS, payload: SchoolDetails });
export const updateSchoolSuccess = updatedSchool => ({ type: UPDATE_SCHOOL_SUCCESS, payload: updatedSchool });
export const addSchoolSuccess = newSchool => ({ type: ADD_SCHOOL_SUCCESS, payload: newSchool });
export const deleteSchoolSuccess = () => ({ type: DELETE_SCHOOL_SUCCESS });
export const schoolOperationFailure = error => ({ type: SCHOOL_OPERATION_FAILURE, payload: error });
