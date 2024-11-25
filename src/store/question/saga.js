import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_QUESTION,
    UPDATE_QUESTION,
    ADD_QUESTION,
    DELETE_QUESTION,

} from './actionTypes';
import { createQuestion, deleteQuestion, fetchAllQuestiones, fetchAllQuestions, updateQuestion } from 'helpers/question_helper';
import {
    fetchQuestion,
    fetchQuestionSuccess,
    updateQuestionSuccess,
    addQuestionSuccess,
    deleteQuestionSuccess,
    questionOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchQuestion: () => Promise.resolve({ name: 'first', description: 'first question' }),
    updateQuestion: updatedQuestion => Promise.resolve(updatedQuestion),
    addQuestion: newQuestion => Promise.resolve(newQuestion),
    deleteQuestion: () => Promise.resolve()
};

// Sagas
function* fetchQuestionSaga() {
    try {
        const questionDetails = yield call(fetchAllQuestions);
        yield put(fetchQuestionSuccess(questionDetails));
    } catch (error) {
        yield put(questionOperationFailure(error));
    }
}

function* updateQuestionSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateQuestion, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateQuestionSuccess(response));
    } catch (error) {
        yield put(questionOperationFailure(error));
    }
}

function* addQuestionSaga(action) {
    try {
        console.log(action, "iiiiiiiiiiiiiiiiiioooooooooooooooo");
        const newQuestion = yield call(createQuestion, action.payload);
        console.log(newQuestion, "yoooy yooo")
        if (newQuestion.success) {
            toast.success(newQuestion.message);
        } else {
            console.log(newQuestion)
            toast.error(newQuestion.message);
        }
        yield put(addQuestionSuccess(newQuestion));
    } catch (error) {
        yield put(questionOperationFailure(error));
    }
}

function* deleteQuestionSaga(action) {
    try {
        const response = yield call(deleteQuestion, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteQuestionSuccess());
    } catch (error) {
        yield put(questionOperationFailure(error));
    }
}

// Root Saga
export default function* questionSaga() {
    yield takeLatest(FETCH_QUESTION, fetchQuestionSaga);
    yield takeLatest(UPDATE_QUESTION, updateQuestionSaga);
    yield takeLatest(ADD_QUESTION, addQuestionSaga);
    yield takeLatest(DELETE_QUESTION, deleteQuestionSaga);
}
