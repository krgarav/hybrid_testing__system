import {
    FETCH_QUESTION,
    UPDATE_QUESTION,
    ADD_QUESTION,
    DELETE_QUESTION,
    FETCH_QUESTION_SUCCESS,
    UPDATE_QUESTION_SUCCESS,
    ADD_QUESTION_SUCCESS,
    DELETE_QUESTION_SUCCESS,
    QUESTION_OPERATION_FAILURE,
    QUESTION_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchQuestion = () => ({ type: FETCH_QUESTION });
export const setSuccessFalseQuestion = () => ({ type: QUESTION_SET_SUCCESS_FALSE });
export const updateQuestion = updatedQuestion => ({ type: UPDATE_QUESTION, payload: updatedQuestion });
export const addQuestion = newQuestion => ({ type: ADD_QUESTION, payload: newQuestion });
export const deleteQuestion = id => ({ type: DELETE_QUESTION, payload: id });
export const fetchQuestionSuccess = questionDetails => ({ type: FETCH_QUESTION_SUCCESS, payload: questionDetails });
export const updateQuestionSuccess = updatedQuestion => ({ type: UPDATE_QUESTION_SUCCESS, payload: updatedQuestion });
export const addQuestionSuccess = newQuestion => ({ type: ADD_QUESTION_SUCCESS, payload: newQuestion });
export const deleteQuestionSuccess = () => ({ type: DELETE_QUESTION_SUCCESS });
export const questionOperationFailure = error => ({ type: QUESTION_OPERATION_FAILURE, payload: error });
