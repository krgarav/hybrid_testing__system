import {
    FETCH_SCHOOL_SUCCESS,
    ADD_SCHOOL_SUCCESS,
    UPDATE_SCHOOL_SUCCESS,
    DELETE_SCHOOL_SUCCESS,
    SCHOOL_OPERATION_FAILURE,
    SCHOOL_SET_SUCCESS_FALSE
} from './actionTypes';

const initialState = {
    school: [],  // This will store an array of school objects
    error: null,   // To handle any errors
    success: null
};

function schoolReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_SCHOOL_SUCCESS:
            return { school: action.payload, error: null, success: action.payload?.success };
        case ADD_SCHOOL_SUCCESS:
            // return { school: [state.school, action.payload], error: null };
            return { school: [], error: null, success: action.payload?.success };

        case UPDATE_SCHOOL_SUCCESS:
            // return {
            //     ...state,
            //     school: state.school.map(cls =>
            //         cls.id === action.payload.id ? action.payload : cls
            //     ),
            //     error: null
            // };
            return { school: [], error: null, success: action.payload?.success };

        case DELETE_SCHOOL_SUCCESS:
            // return {
            //     ...state,
            //     school: state.school.filter(cls => cls.id !== action.payload),
            //     error: null
            // };
            return { school: [], error: null, success: action.payload?.success };

        case SCHOOL_OPERATION_FAILURE:
            return { ...state, error: action.payload, success: action.payload?.success };

        case SCHOOL_SET_SUCCESS_FALSE:
            return { ...state, success: null }

        default:
            return state;
    }
}

export default schoolReducer;
