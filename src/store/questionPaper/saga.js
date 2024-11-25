import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_QUESTIONPAPER,
    UPDATE_QUESTIONPAPER,
    ADD_QUESTIONPAPER,
    DELETE_QUESTIONPAPER,

} from './actionTypes';
import { createQuestionPaper, deleteQuestionPaper, fetchAllQuestionPapers, updateQuestionPaper } from 'helpers/questionPaper_helper';
import {
    fetchQuestionPaper,
    fetchQuestionPaperSuccess,
    updateQuestionPaperSuccess,
    addQuestionPaperSuccess,
    deleteQuestionPaperSuccess,
    questionPaperOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchQuestionPaper: () => Promise.resolve({ name: 'first', description: 'first questionPaper' }),
    updateQuestionPaper: updatedQuestionPaper => Promise.resolve(updatedQuestionPaper),
    addQuestionPaper: newQuestionPaper => Promise.resolve(newQuestionPaper),
    deleteQuestionPaper: () => Promise.resolve()
};

// Sagas
function* fetchQuestionPaperSaga() {
    try {
        const questionPaperDetails = yield call(fetchAllQuestionPapers);
        yield put(fetchQuestionPaperSuccess(questionPaperDetails));
    } catch (error) {
        yield put(questionPaperOperationFailure(error));
    }
}

function* updateQuestionPaperSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateQuestionPaper, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateQuestionPaperSuccess(response));
    } catch (error) {
        yield put(questionPaperOperationFailure(error));
    }
}

function* addQuestionPaperSaga(action) {
    try {
        const newQuestionPaper = yield call(createQuestionPaper, action.payload);
        console.log(newQuestionPaper, "yoooy yooo")
        if (newQuestionPaper.success) {
            toast.success(newQuestionPaper.message);
        } else {
            console.log(newQuestionPaper)
            toast.error(newQuestionPaper.message);
        }
        yield put(addQuestionPaperSuccess(newQuestionPaper));
    } catch (error) {
        yield put(questionPaperOperationFailure(error));
    }
}

function* deleteQuestionPaperSaga(action) {
    try {
        const response = yield call(deleteQuestionPaper, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteQuestionPaperSuccess());
    } catch (error) {
        yield put(questionPaperOperationFailure(error));
    }
}

// Root Saga
export default function* questionPaperSaga() {
    yield takeLatest(FETCH_QUESTIONPAPER, fetchQuestionPaperSaga);
    yield takeLatest(UPDATE_QUESTIONPAPER, updateQuestionPaperSaga);
    yield takeLatest(ADD_QUESTIONPAPER, addQuestionPaperSaga);
    yield takeLatest(DELETE_QUESTIONPAPER, deleteQuestionPaperSaga);
}
