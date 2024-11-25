import {
    FETCH_DIFFICULTY_SUCCESS,
    ADD_DIFFICULTY_SUCCESS,
    UPDATE_DIFFICULTY_SUCCESS,
    DELETE_DIFFICULTY_SUCCESS,
    DIFFICULTY_OPERATION_FAILURE,
    DIFFICULTY_SET_SUCCESS_FALSE
} from './actionTypes';

const initialState = {
    difficultys: [],  // This will store an array of difficulty objects
    error: null,
    success: null   // To handle any errors
};

function difficultysReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DIFFICULTY_SUCCESS:
            return { difficultys: action.payload, error: null, success: action.payload?.success };

        case ADD_DIFFICULTY_SUCCESS:
            // return { difficultys: [state.difficultys, action.payload], error: null };
            return { difficultys: [], error: null, success: action.payload?.success };

        case UPDATE_DIFFICULTY_SUCCESS:
            // return {
            //     ...state,
            //     difficultys: state.difficultys.map(cls =>
            //         cls.id === action.payload.id ? action.payload : cls
            //     ),
            //     error: null
            // };
            return { difficultys: [], error: null, success: action.payload?.success };

        case DELETE_DIFFICULTY_SUCCESS:
            // return {
            //     ...state,
            //     difficultys: state.difficultys.filter(cls => cls.id !== action.payload),
            //     error: null
            // };
            return { difficultys: [], error: null, success: action.payload?.success };

        case DIFFICULTY_OPERATION_FAILURE:
            return { ...state, error: action.payload, success: action.payload?.success };

        case DIFFICULTY_SET_SUCCESS_FALSE:
            return { ...state, success: null }

        default:
            return state;
    }
}

export default difficultysReducer;
