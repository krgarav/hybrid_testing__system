import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_DIFFICULTY,
    UPDATE_DIFFICULTY,
    ADD_DIFFICULTY,
    DELETE_DIFFICULTY,

} from './actionTypes';
import { createDifficulty, deleteDifficulty, fetchAllDifficultyes, fetchAllDifficultys, updateDifficulty } from 'helpers/difficulty_helper';
import {
    fetchDifficulty,
    fetchDifficultySuccess,
    updateDifficultySuccess,
    addDifficultySuccess,
    deleteDifficultySuccess,
    difficultyOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchDifficulty: () => Promise.resolve({ name: 'first', description: 'first difficulty' }),
    updateDifficulty: updatedDifficulty => Promise.resolve(updatedDifficulty),
    addDifficulty: newDifficulty => Promise.resolve(newDifficulty),
    deleteDifficulty: () => Promise.resolve()
};

// Sagas
function* fetchDifficultySaga() {
    try {
        const difficultyDetails = yield call(fetchAllDifficultys);
        yield put(fetchDifficultySuccess(difficultyDetails));
    } catch (error) {
        yield put(difficultyOperationFailure(error));
    }
}

function* updateDifficultySaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateDifficulty, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateDifficultySuccess(response));
    } catch (error) {
        yield put(difficultyOperationFailure(error));
    }
}

function* addDifficultySaga(action) {
    try {
        const newDifficulty = yield call(createDifficulty, action.payload);
        if (newDifficulty.success) {
            toast.success(newDifficulty.message);
        } else {
            console.log(newDifficulty)
            toast.error(newDifficulty.message);
        }
        yield put(addDifficultySuccess(newDifficulty));
    } catch (error) {
        yield put(difficultyOperationFailure(error));
    }
}

function* deleteDifficultySaga(action) {
    try {
        const response = yield call(deleteDifficulty, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteDifficultySuccess());
    } catch (error) {
        yield put(difficultyOperationFailure(error));
    }
}

// Root Saga
export default function* difficultySaga() {
    yield takeLatest(FETCH_DIFFICULTY, fetchDifficultySaga);
    yield takeLatest(UPDATE_DIFFICULTY, updateDifficultySaga);
    yield takeLatest(ADD_DIFFICULTY, addDifficultySaga);
    yield takeLatest(DELETE_DIFFICULTY, deleteDifficultySaga);
}
