import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_LANGUAGE,
    UPDATE_LANGUAGE,
    ADD_LANGUAGE,
    DELETE_LANGUAGE,

} from './actionTypes';
import { createLanguage, deleteLanguage, fetchAllLanguagees, fetchAllLanguages, updateLanguage } from 'helpers/language_helper';
import {
    fetchLanguage,
    fetchLanguageSuccess,
    updateLanguageSuccess,
    addLanguageSuccess,
    deleteLanguageSuccess,
    languageOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchLanguage: () => Promise.resolve({ name: 'first', description: 'first language' }),
    updateLanguage: updatedLanguage => Promise.resolve(updatedLanguage),
    addLanguage: newLanguage => Promise.resolve(newLanguage),
    deleteLanguage: () => Promise.resolve()
};

// Sagas
function* fetchLanguageSaga() {
    try {
        const languageDetails = yield call(fetchAllLanguages);
        yield put(fetchLanguageSuccess(languageDetails));
    } catch (error) {
        yield put(languageOperationFailure(error));
    }
}

function* updateLanguageSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateLanguage, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateLanguageSuccess(response));
    } catch (error) {
        yield put(languageOperationFailure(error));
    }
}

function* addLanguageSaga(action) {
    try {
        const newLanguage = yield call(createLanguage, action.payload);
        if (newLanguage.success) {
            toast.success(newLanguage.message);
        } else {
            console.log(newLanguage)
            toast.error(newLanguage.message);
        }
        yield put(addLanguageSuccess(newLanguage));
    } catch (error) {
        yield put(languageOperationFailure(error));
    }
}

function* deleteLanguageSaga(action) {
    try {
        const response = yield call(deleteLanguage, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteLanguageSuccess());
    } catch (error) {
        yield put(languageOperationFailure(error));
    }
}

// Root Saga
export default function* languageSaga() {
    yield takeLatest(FETCH_LANGUAGE, fetchLanguageSaga);
    yield takeLatest(UPDATE_LANGUAGE, updateLanguageSaga);
    yield takeLatest(ADD_LANGUAGE, addLanguageSaga);
    yield takeLatest(DELETE_LANGUAGE, deleteLanguageSaga);
}
