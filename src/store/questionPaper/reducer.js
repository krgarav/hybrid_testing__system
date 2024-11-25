import {
    FETCH_QUESTIONPAPER_SUCCESS,
    ADD_QUESTIONPAPER_SUCCESS,
    UPDATE_QUESTIONPAPER_SUCCESS,
    DELETE_QUESTIONPAPER_SUCCESS,
    QUESTIONPAPER_OPERATION_FAILURE,
    QUESTIONPAPER_SET_SUCCESS_FALSE
} from './actionTypes';

const initialState = {
    questionPapers: [],  // This will store an array of questionPaper objects
    error: null,
    success: null // To handle any errors
};

function questionPapersReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUESTIONPAPER_SUCCESS:
            return { questionPapers: action.payload, error: null, success: action.payload?.success };

        case ADD_QUESTIONPAPER_SUCCESS:
            // return { questionPapers: [state.questionPapers, action.payload], error: null };
            return { questionPapers: [], error: null, success: action.payload?.success };

        case UPDATE_QUESTIONPAPER_SUCCESS:
            // return {
            //     ...state,
            //     questionPapers: state.questionPapers.map(cls =>
            //         cls.id === action.payload.id ? action.payload : cls
            //     ),
            //     error: null
            // };
            return { questionPapers: [], error: null, success: action.payload?.success };

        case DELETE_QUESTIONPAPER_SUCCESS:
            // return {
            //     ...state,
            //     questionPapers: state.questionPapers.filter(cls => cls.id !== action.payload),
            //     error: null
            // };
            return { questionPapers: [], error: null, success: action.payload?.success };

        case QUESTIONPAPER_OPERATION_FAILURE:
            return { ...state, error: action.payload, success: action.payload?.success };

        case QUESTIONPAPER_SET_SUCCESS_FALSE:
            return { ...state, success: null }

        default:
            return state;
    }
}

export default questionPapersReducer;
