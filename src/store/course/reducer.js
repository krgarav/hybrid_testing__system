import {
    FETCH_COURSE_SUCCESS,
    ADD_COURSE_SUCCESS,
    UPDATE_COURSE_SUCCESS,
    DELETE_COURSE_SUCCESS,
    COURSE_OPERATION_FAILURE,
    COURSE_SET_SUCCESS_FALSE
} from './actionTypes';

const initialState = {
    courses: [],  // This will store an array of course objects
    error: null,
    success: null   // To handle any errors
};

function coursesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COURSE_SUCCESS:
            return { courses: action.payload, error: null, success: action.payload?.success };

        case ADD_COURSE_SUCCESS:
            // return { courses: [state.courses, action.payload], error: null };
            return { courses: [], error: null, success: action.payload?.success };

        case UPDATE_COURSE_SUCCESS:
            // return {
            //     ...state,
            //     courses: state.courses.map(cls =>
            //         cls.id === action.payload.id ? action.payload : cls
            //     ),
            //     error: null
            // };
            return { courses: [], error: null, success: action.payload?.success };

        case DELETE_COURSE_SUCCESS:
            // return {
            //     ...state,
            //     courses: state.courses.filter(cls => cls.id !== action.payload),
            //     error: null
            // };
            return { courses: [], error: null, success: action.payload?.success };

        case COURSE_OPERATION_FAILURE:
            return { ...state, error: action.payload, success: action.payload?.success };

        case COURSE_SET_SUCCESS_FALSE:
            return { ...state, success: null }

        default:
            return state;
    }
}

export default coursesReducer;
