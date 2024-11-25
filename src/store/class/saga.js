import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_CLASS,
    UPDATE_CLASS,
    ADD_CLASS,
    DELETE_CLASS,

} from './actionTypes';
import { createClass, deleteClass, fetchAllClasses, updateClass } from 'helpers/class_helper';
import {
    fetchClass,
    fetchClassSuccess,
    updateClassSuccess,
    addClassSuccess,
    deleteClassSuccess,
    classOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchClass: () => Promise.resolve({ name: 'first', description: 'first class' }),
    updateClass: updatedClass => Promise.resolve(updatedClass),
    addClass: newClass => Promise.resolve(newClass),
    deleteClass: () => Promise.resolve()
};

// Sagas
function* fetchClassSaga() {
    try {
        const classDetails = yield call(fetchAllClasses);
        yield put(fetchClassSuccess(classDetails));
    } catch (error) {
        yield put(classOperationFailure(error));
    }
}

function* updateClassSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateClass, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateClassSuccess(response));
    } catch (error) {
        yield put(classOperationFailure(error));
    }
}

function* addClassSaga(action) {
    try {
        const newClass = yield call(createClass, action.payload);
        console.log(newClass, "yoooy yooo")
        if (newClass.success) {
            toast.success(newClass.message);
        } else {
            console.log(newClass)
            toast.error(newClass.message);
        }
        yield put(addClassSuccess(newClass));
    } catch (error) {
        yield put(classOperationFailure(error));
    }
}

function* deleteClassSaga(action) {
    try {
        const response = yield call(deleteClass, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteClassSuccess());
    } catch (error) {
        yield put(classOperationFailure(error));
    }
}

// Root Saga
export default function* classSaga() {
    yield takeLatest(FETCH_CLASS, fetchClassSaga);
    yield takeLatest(UPDATE_CLASS, updateClassSaga);
    yield takeLatest(ADD_CLASS, addClassSaga);
    yield takeLatest(DELETE_CLASS, deleteClassSaga);
}
