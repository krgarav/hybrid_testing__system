import {
    FETCH_QUESTION_SUCCESS,
    ADD_QUESTION_SUCCESS,
    UPDATE_QUESTION_SUCCESS,
    DELETE_QUESTION_SUCCESS,
    QUESTION_OPERATION_FAILURE,
    QUESTION_SET_SUCCESS_FALSE
} from './actionTypes';

const initialState = {
    questions: [],  // This will store an array of question objects
    error: null,   // To handle any errors
    success: null
};

function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUESTION_SUCCESS:
            return { questions: action.payload, error: null, success: action.payload?.success };

        case ADD_QUESTION_SUCCESS:
            // return { questions: [state.questions, action.payload], error: null };
            return { questions: [], error: null, success: action.payload?.success };

        case UPDATE_QUESTION_SUCCESS:
            // return {
            //     ...state,
            //     questions: state.questions.map(cls =>
            //         cls.id === action.payload.id ? action.payload : cls
            //     ),
            //     error: null
            // };
            return { ...state, error: null, success: action.payload?.success };

        case DELETE_QUESTION_SUCCESS:
            // return {
            //     ...state,
            //     questions: state.questions.filter(cls => cls.id !== action.payload),
            //     error: null
            // };
            return { questions: [], error: null, success: action.payload?.success };

        case QUESTION_OPERATION_FAILURE:
            return { ...state, error: action.payload, success: action.payload?.success };

        case QUESTION_SET_SUCCESS_FALSE:
            return { ...state, success: null }

        default:
            return state;
    }
}

export default questionsReducer;
