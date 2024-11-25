import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_COURSE,
    UPDATE_COURSE,
    ADD_COURSE,
    DELETE_COURSE,

} from './actionTypes';
import { createCourse, deleteCourse, fetchAllCoursees, fetchAllCourses, updateCourse } from 'helpers/course_helper';
import {
    fetchCourse,
    fetchCourseSuccess,
    updateCourseSuccess,
    addCourseSuccess,
    deleteCourseSuccess,
    courseOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchCourse: () => Promise.resolve({ name: 'first', description: 'first course' }),
    updateCourse: updatedCourse => Promise.resolve(updatedCourse),
    addCourse: newCourse => Promise.resolve(newCourse),
    deleteCourse: () => Promise.resolve()
};

// Sagas
function* fetchCourseSaga() {
    try {
        const courseDetails = yield call(fetchAllCourses);
        yield put(fetchCourseSuccess(courseDetails));
    } catch (error) {
        yield put(courseOperationFailure(error));
    }
}

function* updateCourseSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateCourse, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateCourseSuccess(response));
    } catch (error) {
        yield put(courseOperationFailure(error));
    }
}

function* addCourseSaga(action) {
    try {
        const newCourse = yield call(createCourse, action.payload);
        if (newCourse.success) {
            toast.success(newCourse.message);
        } else {
            console.log(newCourse)
            toast.error(newCourse.message);
        }
        yield put(addCourseSuccess(newCourse));
    } catch (error) {
        yield put(courseOperationFailure(error));
    }
}

function* deleteCourseSaga(action) {
    try {
        const response = yield call(deleteCourse, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteCourseSuccess());
    } catch (error) {
        yield put(courseOperationFailure(error));
    }
}

// Root Saga
export default function* courseSaga() {
    yield takeLatest(FETCH_COURSE, fetchCourseSaga);
    yield takeLatest(UPDATE_COURSE, updateCourseSaga);
    yield takeLatest(ADD_COURSE, addCourseSaga);
    yield takeLatest(DELETE_COURSE, deleteCourseSaga);
}
