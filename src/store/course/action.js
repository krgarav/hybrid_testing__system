import {
    FETCH_COURSE,
    UPDATE_COURSE,
    ADD_COURSE,
    DELETE_COURSE,
    FETCH_COURSE_SUCCESS,
    UPDATE_COURSE_SUCCESS,
    ADD_COURSE_SUCCESS,
    DELETE_COURSE_SUCCESS,
    COURSE_OPERATION_FAILURE,
    COURSE_SET_SUCCESS_FALSE
} from './actionTypes';

export const fetchCourse = () => ({ type: FETCH_COURSE });
export const setSuccessFalseCourse = () => ({ type: COURSE_SET_SUCCESS_FALSE });
export const updateCourse = updatedCourse => ({ type: UPDATE_COURSE, payload: updatedCourse });
export const addCourse = newCourse => ({ type: ADD_COURSE, payload: newCourse });
export const deleteCourse = id => ({ type: DELETE_COURSE, payload: id });
export const fetchCourseSuccess = courseDetails => ({ type: FETCH_COURSE_SUCCESS, payload: courseDetails });
export const updateCourseSuccess = updatedCourse => ({ type: UPDATE_COURSE_SUCCESS, payload: updatedCourse });
export const addCourseSuccess = newCourse => ({ type: ADD_COURSE_SUCCESS, payload: newCourse });
export const deleteCourseSuccess = () => ({ type: DELETE_COURSE_SUCCESS });
export const courseOperationFailure = error => ({ type: COURSE_OPERATION_FAILURE, payload: error });
