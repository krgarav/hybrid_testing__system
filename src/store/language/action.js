import {
    FETCH_LANGUAGE,
    UPDATE_LANGUAGE,
    ADD_LANGUAGE,
    DELETE_LANGUAGE,
    FETCH_LANGUAGE_SUCCESS,
    UPDATE_LANGUAGE_SUCCESS,
    ADD_LANGUAGE_SUCCESS,
    DELETE_LANGUAGE_SUCCESS,
    LANGUAGE_OPERATION_FAILURE,
    LANGUAGE_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchLanguage = () => ({ type: FETCH_LANGUAGE });

export const updateLanguage = updatedLanguage => ({ type: UPDATE_LANGUAGE, payload: updatedLanguage });
export const setSuccessFalseLanguage = () => ({ type: LANGUAGE_SET_SUCCESS_FALSE });
export const addLanguage = newLanguage => ({ type: ADD_LANGUAGE, payload: newLanguage });
export const deleteLanguage = id => ({ type: DELETE_LANGUAGE, payload: id });
export const fetchLanguageSuccess = languageDetails => ({ type: FETCH_LANGUAGE_SUCCESS, payload: languageDetails });
export const updateLanguageSuccess = updatedLanguage => ({ type: UPDATE_LANGUAGE_SUCCESS, payload: updatedLanguage });
export const addLanguageSuccess = newLanguage => ({ type: ADD_LANGUAGE_SUCCESS, payload: newLanguage });
export const deleteLanguageSuccess = () => ({ type: DELETE_LANGUAGE_SUCCESS });
export const languageOperationFailure = error => ({ type: LANGUAGE_OPERATION_FAILURE, payload: error });
