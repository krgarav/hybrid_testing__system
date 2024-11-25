import {
    FETCH_DIFFICULTY,
    UPDATE_DIFFICULTY,
    ADD_DIFFICULTY,
    DELETE_DIFFICULTY,
    FETCH_DIFFICULTY_SUCCESS,
    UPDATE_DIFFICULTY_SUCCESS,
    ADD_DIFFICULTY_SUCCESS,
    DELETE_DIFFICULTY_SUCCESS,
    DIFFICULTY_OPERATION_FAILURE,
    DIFFICULTY_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchDifficulty = () => ({ type: FETCH_DIFFICULTY });
export const setSuccessFalseDifficulty = () => ({ type: DIFFICULTY_SET_SUCCESS_FALSE });
export const updateDifficulty = updatedDifficulty => ({ type: UPDATE_DIFFICULTY, payload: updatedDifficulty });
export const addDifficulty = newDifficulty => ({ type: ADD_DIFFICULTY, payload: newDifficulty });
export const deleteDifficulty = id => ({ type: DELETE_DIFFICULTY, payload: id });
export const fetchDifficultySuccess = difficultyDetails => ({ type: FETCH_DIFFICULTY_SUCCESS, payload: difficultyDetails });
export const updateDifficultySuccess = updatedDifficulty => ({ type: UPDATE_DIFFICULTY_SUCCESS, payload: updatedDifficulty });
export const addDifficultySuccess = newDifficulty => ({ type: ADD_DIFFICULTY_SUCCESS, payload: newDifficulty });
export const deleteDifficultySuccess = () => ({ type: DELETE_DIFFICULTY_SUCCESS });
export const difficultyOperationFailure = error => ({ type: DIFFICULTY_OPERATION_FAILURE, payload: error });
