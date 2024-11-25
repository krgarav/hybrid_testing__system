import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_SECTION,
    UPDATE_SECTION,
    ADD_SECTION,
    DELETE_SECTION,

} from './actionTypes';
import { createSection, deleteSection, fetchAllSectiones, fetchAllSections, updateSection } from 'helpers/section_helper';
import {
    fetchSection,
    fetchSectionSuccess,
    updateSectionSuccess,
    addSectionSuccess,
    deleteSectionSuccess,
    sectionOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchSection: () => Promise.resolve({ name: 'first', description: 'first section' }),
    updateSection: updatedSection => Promise.resolve(updatedSection),
    addSection: newSection => Promise.resolve(newSection),
    deleteSection: () => Promise.resolve()
};

// Sagas
function* fetchSectionSaga() {
    try {
        const sectionDetails = yield call(fetchAllSections);
        yield put(fetchSectionSuccess(sectionDetails));
    } catch (error) {
        yield put(sectionOperationFailure(error));
    }
}

function* updateSectionSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateSection, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateSectionSuccess(response));
    } catch (error) {
        yield put(sectionOperationFailure(error));
    }
}

function* addSectionSaga(action) {
    try {
        console.log(action, "iiiiiiiiiiiiiiiiiioooooooooooooooo");
        const newSection = yield call(createSection, action.payload);
        console.log(newSection, "yoooy yooo")
        if (newSection.success) {
            toast.success(newSection.message);
        } else {
            console.log(newSection)
            toast.error(newSection.message);
        }
        yield put(addSectionSuccess(newSection));
    } catch (error) {
        yield put(sectionOperationFailure(error));
    }
}

function* deleteSectionSaga(action) {
    try {
        const response = yield call(deleteSection, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteSectionSuccess());
    } catch (error) {
        yield put(sectionOperationFailure(error));
    }
}

// Root Saga
export default function* sectionSaga() {
    yield takeLatest(FETCH_SECTION, fetchSectionSaga);
    yield takeLatest(UPDATE_SECTION, updateSectionSaga);
    yield takeLatest(ADD_SECTION, addSectionSaga);
    yield takeLatest(DELETE_SECTION, deleteSectionSaga);
}
