import {
    FETCH_USER_SUCCESS,
    ADD_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    USER_OPERATION_FAILURE,
    USER_SET_SUCCESS_FALSE
} from './actionTypes';

const initialState = {
    users: [],  // This will store an array of user objects
    error: null,   // To handle any errors
    success: null
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return { users: action.payload, error: null, success: action.payload?.success };

        case ADD_USER_SUCCESS:
            // return { users: [state.users, action.payload], error: null };
            return { users: [], error: null, success: action.payload?.success };

        case UPDATE_USER_SUCCESS:
            // return {
            //     ...state,
            //     users: state.users.map(cls =>
            //         cls.id === action.payload.id ? action.payload : cls
            //     ),
            //     error: null
            // };
            return { users: [], error: null, success: action.payload?.success };

        case DELETE_USER_SUCCESS:
            // return {
            //     ...state,
            //     users: state.users.filter(cls => cls.id !== action.payload),
            //     error: null
            // };
            return { users: [], error: null, success: action.payload?.success };

        case USER_OPERATION_FAILURE:
            return { ...state, error: action.payload, success: action.payload?.success };

        case USER_SET_SUCCESS_FALSE:
            return { ...state, success: null }

        default:
            return state;
    }
}

export default userReducer;
