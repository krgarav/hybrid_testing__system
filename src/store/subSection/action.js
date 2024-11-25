import {
    FETCH_SUBSECTION,
    UPDATE_SUBSECTION,
    ADD_SUBSECTION,
    DELETE_SUBSECTION,
    FETCH_SUBSECTION_SUCCESS,
    UPDATE_SUBSECTION_SUCCESS,
    ADD_SUBSECTION_SUCCESS,
    DELETE_SUBSECTION_SUCCESS,
    SUBSECTION_OPERATION_FAILURE,
    SUBSECTION_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchSubSection = () => ({ type: FETCH_SUBSECTION });
export const setSuccessFalseSubSection = () => ({ type: SUBSECTION_SET_SUCCESS_FALSE });
export const updateSubSection = updatedSubSection => ({ type: UPDATE_SUBSECTION, payload: updatedSubSection });
export const addSubSection = newSubSection => ({ type: ADD_SUBSECTION, payload: newSubSection });
export const deleteSubSection = id => ({ type: DELETE_SUBSECTION, payload: id });
export const fetchSubSectionSuccess = SubSectionDetails => ({ type: FETCH_SUBSECTION_SUCCESS, payload: SubSectionDetails });
export const updateSubSectionSuccess = updatedSubSection => ({ type: UPDATE_SUBSECTION_SUCCESS, payload: updatedSubSection });
export const addSubSectionSuccess = newSubSection => ({ type: ADD_SUBSECTION_SUCCESS, payload: newSubSection });
export const deleteSubSectionSuccess = () => ({ type: DELETE_SUBSECTION_SUCCESS });
export const subSubSectionOperationFailure = error => ({ type: SUBSECTION_OPERATION_FAILURE, payload: error });
