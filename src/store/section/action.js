import {
    FETCH_SECTION,
    UPDATE_SECTION,
    ADD_SECTION,
    DELETE_SECTION,
    FETCH_SECTION_SUCCESS,
    UPDATE_SECTION_SUCCESS,
    ADD_SECTION_SUCCESS,
    DELETE_SECTION_SUCCESS,
    SECTION_OPERATION_FAILURE,
    SECTION_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchSection = () => ({ type: FETCH_SECTION });
export const setSuccessFalseSection = () => ({ type: SECTION_SET_SUCCESS_FALSE });
export const updateSection = updatedSection => ({ type: UPDATE_SECTION, payload: updatedSection });
export const addSection = newSection => ({ type: ADD_SECTION, payload: newSection });
export const deleteSection = id => ({ type: DELETE_SECTION, payload: id });
export const fetchSectionSuccess = SectionDetails => ({ type: FETCH_SECTION_SUCCESS, payload: SectionDetails });
export const updateSectionSuccess = updatedSection => ({ type: UPDATE_SECTION_SUCCESS, payload: updatedSection });
export const addSectionSuccess = newSection => ({ type: ADD_SECTION_SUCCESS, payload: newSection });
export const deleteSectionSuccess = () => ({ type: DELETE_SECTION_SUCCESS });
export const sectionOperationFailure = error => ({ type: SECTION_OPERATION_FAILURE, payload: error });
