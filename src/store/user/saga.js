import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_USER,
    UPDATE_USER,
    ADD_USER,
    DELETE_USER,

} from './actionTypes';
import { createUser, deleteUser, fetchAllUsers, updateUser } from 'helpers/user_helper';
import {
    fetchUser,
    fetchUserSuccess,
    updateUserSuccess,
    addUserSuccess,
    deleteUserSuccess,
    userOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchUser: () => Promise.resolve({ name: 'first', description: 'first user' }),
    updateUser: updatedUser => Promise.resolve(updatedUser),
    addUser: newUser => Promise.resolve(newUser),
    deleteUser: () => Promise.resolve()
};

// Sagas
function* fetchUserSaga() {
    try {
        const userDetails = yield call(fetchAllUsers);
        yield put(fetchUserSuccess(userDetails));
    } catch (error) {
        yield put(userOperationFailure(error));
    }
}

function* updateUserSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateUser, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateUserSuccess(response));
    } catch (error) {
        yield put(userOperationFailure(error));
    }
}

function* addUserSaga(action) {
    try {
        const newUser = yield call(createUser, action.payload);
        console.log(newUser, "yoooy yooo")
        if (newUser.success) {
            toast.success(newUser.message);
        } else {
            console.log(newUser)
            toast.error(newUser.message);
        }
        yield put(addUserSuccess(newUser));
    } catch (error) {
        yield put(userOperationFailure(error));
    }
}

function* deleteUserSaga(action) {
    try {
        const response = yield call(deleteUser, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteUserSuccess());
    } catch (error) {
        yield put(userOperationFailure(error));
    }
}

// Root Saga
export default function* userSaga() {
    yield takeLatest(FETCH_USER, fetchUserSaga);
    yield takeLatest(UPDATE_USER, updateUserSaga);
    yield takeLatest(ADD_USER, addUserSaga);
    yield takeLatest(DELETE_USER, deleteUserSaga);
}
