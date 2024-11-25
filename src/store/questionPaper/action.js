import {
    FETCH_QUESTIONPAPER,
    UPDATE_QUESTIONPAPER,
    ADD_QUESTIONPAPER,
    DELETE_QUESTIONPAPER,
    FETCH_QUESTIONPAPER_SUCCESS,
    UPDATE_QUESTIONPAPER_SUCCESS,
    ADD_QUESTIONPAPER_SUCCESS,
    DELETE_QUESTIONPAPER_SUCCESS,
    QUESTIONPAPER_OPERATION_FAILURE,
    QUESTIONPAPER_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchQuestionPaper = () => ({ type: FETCH_QUESTIONPAPER });
export const setSuccessFalseQuestionPaper = () => ({ type: QUESTIONPAPER_SET_SUCCESS_FALSE });
export const updateQuestionPaper = updatedQuestionPaper => ({ type: UPDATE_QUESTIONPAPER, payload: updatedQuestionPaper });
export const addQuestionPaper = newQuestionPaper => ({ type: ADD_QUESTIONPAPER, payload: newQuestionPaper });
export const deleteQuestionPaper = id => ({ type: DELETE_QUESTIONPAPER, payload: id });
export const fetchQuestionPaperSuccess = questionPaperDetails => ({ type: FETCH_QUESTIONPAPER_SUCCESS, payload: questionPaperDetails });
export const updateQuestionPaperSuccess = updatedQuestionPaper => ({ type: UPDATE_QUESTIONPAPER_SUCCESS, payload: updatedQuestionPaper });
export const addQuestionPaperSuccess = newQuestionPaper => ({ type: ADD_QUESTIONPAPER_SUCCESS, payload: newQuestionPaper });
export const deleteQuestionPaperSuccess = () => ({ type: DELETE_QUESTIONPAPER_SUCCESS });
export const questionPaperOperationFailure = error => ({ type: QUESTIONPAPER_OPERATION_FAILURE, payload: error });
