import {
    FETCH_SUBSECTION_SUCCESS,
    ADD_SUBSECTION_SUCCESS,
    UPDATE_SUBSECTION_SUCCESS,
    DELETE_SUBSECTION_SUCCESS,
    SUBSECTION_OPERATION_FAILURE,
    SUBSECTION_SET_SUCCESS_FALSE
} from './actionTypes';

const initialState = {
    subSections: [],  // This will store an array of subSection objects
    error: null,   // To handle any errors
    success: null
};

function subSectionsReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_SUBSECTION_SUCCESS:
            return { subSections: action.payload, error: null, success: action.payload?.success };
        case ADD_SUBSECTION_SUCCESS:
            // return { subSections: [state.subSections, action.payload], error: null };
            return { subSections: [], error: null, success: action.payload?.success };

        case UPDATE_SUBSECTION_SUCCESS:
            // return {
            //     ...state,
            //     subSections: state.subSections.map(cls =>
            //         cls.id === action.payload.id ? action.payload : cls
            //     ),
            //     error: null
            // };
            return { subSections: [], error: null, success: action.payload?.success };

        case DELETE_SUBSECTION_SUCCESS:
            // return {
            //     ...state,
            //     subSections: state.subSections.filter(cls => cls.id !== action.payload),
            //     error: null
            // };
            return { subSections: [], error: null, success: action.payload?.success };

        case SUBSECTION_OPERATION_FAILURE:
            return { ...state, error: action.payload, success: action.payload?.success };

        case SUBSECTION_SET_SUCCESS_FALSE:
            return { ...state, success: null }

        default:
            return state;
    }
}

export default subSectionsReducer;
