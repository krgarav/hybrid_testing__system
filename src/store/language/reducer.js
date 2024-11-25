import {
    FETCH_LANGUAGE_SUCCESS,
    ADD_LANGUAGE_SUCCESS,
    UPDATE_LANGUAGE_SUCCESS,
    DELETE_LANGUAGE_SUCCESS,
    LANGUAGE_OPERATION_FAILURE,
    LANGUAGE_SET_SUCCESS_FALSE
} from './actionTypes';

const initialState = {
    languages: [],  // This will store an array of language objects
    error: null,   // To handle any errors
    success: null
};

function languagesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LANGUAGE_SUCCESS:
            return { languages: action.payload, error: null, success: action.payload?.success };

        case ADD_LANGUAGE_SUCCESS:
            // return { languages: [state.languages, action.payload], error: null };
            return { languages: [], error: null, success: action.payload?.success };

        case UPDATE_LANGUAGE_SUCCESS:
            // return {
            //     ...state,
            //     languages: state.languages.map(cls =>
            //         cls.id === action.payload.id ? action.payload : cls
            //     ),
            //     error: null
            // };
            return { languages: [], error: null, success: action.payload?.success };

        case DELETE_LANGUAGE_SUCCESS:
            // return {
            //     ...state,
            //     languages: state.languages.filter(cls => cls.id !== action.payload),
            //     error: null
            // };
            return { languages: [], error: null, success: action.payload?.success };

        case LANGUAGE_OPERATION_FAILURE:
            return { ...state, error: action.payload, success: action.payload?.success };

        case LANGUAGE_SET_SUCCESS_FALSE:
            return { ...state, success: null }


        default:
            return state;
    }
}

export default languagesReducer;
