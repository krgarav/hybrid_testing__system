import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_SCHOOL,
    UPDATE_SCHOOL,
    ADD_SCHOOL,
    DELETE_SCHOOL,

} from './actionTypes';
import { createSchool, deleteSchool, fetchAllSchools, updateSchool } from 'helpers/school_helper';
import {
    fetchSchool,
    fetchSchoolSuccess,
    updateSchoolSuccess,
    addSchoolSuccess,
    deleteSchoolSuccess,
    schoolOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchSchool: () => Promise.resolve({ name: 'first', description: 'first school' }),
    updateSchool: updatedSchool => Promise.resolve(updatedSchool),
    addSchool: newSchool => Promise.resolve(newSchool),
    deleteSchool: () => Promise.resolve()
};

// Sagas
function* fetchSchoolSaga() {
    try {
        const schoolDetails = yield call(fetchAllSchools);
        yield put(fetchSchoolSuccess(schoolDetails));
    } catch (error) {
        yield put(schoolOperationFailure(error));
    }
}

function* updateSchoolSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateSchool, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateSchoolSuccess(response));
    } catch (error) {
        yield put(schoolOperationFailure(error));
    }
}

function* addSchoolSaga(action) {
    try {
        console.log(action, "iiiiiiiiiiiiiiiiiioooooooooooooooo");
        const newSchool = yield call(createSchool, action.payload);
        console.log(newSchool, "yoooy yooo")
        if (newSchool.success) {
            toast.success(newSchool.message);
        } else {
            console.log(newSchool)
            toast.error(newSchool.message);
        }
        yield put(addSchoolSuccess(newSchool));
    } catch (error) {
        yield put(schoolOperationFailure(error));
    }
}

function* deleteSchoolSaga(action) {
    try {
        const response = yield call(deleteSchool, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteSchoolSuccess());
    } catch (error) {
        yield put(schoolOperationFailure(error));
    }
}

// Root Saga
export default function* schoolSaga() {
    yield takeLatest(FETCH_SCHOOL, fetchSchoolSaga);
    yield takeLatest(UPDATE_SCHOOL, updateSchoolSaga);
    yield takeLatest(ADD_SCHOOL, addSchoolSaga);
    yield takeLatest(DELETE_SCHOOL, deleteSchoolSaga);
}
