import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_SUBSECTION,
    UPDATE_SUBSECTION,
    ADD_SUBSECTION,
    DELETE_SUBSECTION,

} from './actionTypes';
import { createSubSection, deleteSubSection, fetchAllSubSections, updateSubSection  } from 'helpers/subSection_helper';
import {
    fetchSubSection,
    fetchSubSectionSuccess,
    updateSubSectionSuccess,
    addSubSectionSuccess,
    deleteSubSectionSuccess,
    subSubSectionOperationFailure
} from './action';
import { toast } from 'react-toastify';

// Mock API calls
const api = {
    fetchSubSection: () => Promise.resolve({ name: 'first', description: 'first subSubSection' }),
    updateSubSection: updatedSubSection => Promise.resolve(updatedSubSection),
    addSubSection: newSubSection => Promise.resolve(newSubSection),
    deleteSubSection: () => Promise.resolve()
    
};

// Sagas
function* fetchSubSectionSaga() {
    try {
        const subSubSectionDetails = yield call(fetchAllSubSections);
        yield put(fetchSubSectionSuccess(subSubSectionDetails));
    } catch (error) {
        yield put(subSubSectionOperationFailure(error));
    }
}

function* updateSubSectionSaga(action) {
    try {
        console.log(action.payload);
        const response = yield call(updateSubSection, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(updateSubSectionSuccess(response));
    } catch (error) {
        yield put(subSubSectionOperationFailure(error));
    }
}

function* addSubSectionSaga(action) {
    try {
        console.log(action, "iiiiiiiiiiiiiiiiiioooooooooooooooo");
        const newSubSection = yield call(createSubSection, action.payload);
        console.log(newSubSection, "yoooy yooo")
        if (newSubSection.success) {
            toast.success(newSubSection.message);
        } else {
            console.log(newSubSection)
            toast.error(newSubSection.message);
        }
        yield put(addSubSectionSuccess(newSubSection));
    } catch (error) {
        yield put(subSubSectionOperationFailure(error));
    }
}

function* deleteSubSectionSaga(action) {
    try {
        const response = yield call(deleteSubSection, action.payload);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        yield put(deleteSubSectionSuccess());
    } catch (error) {
        yield put(subSubSectionOperationFailure(error));
    }
}

// Root Saga
export default function* subSubSectionSaga() {
    yield takeLatest(FETCH_SUBSECTION, fetchSubSectionSaga);
    yield takeLatest(UPDATE_SUBSECTION, updateSubSectionSaga);
    yield takeLatest(ADD_SUBSECTION, addSubSectionSaga);
    yield takeLatest(DELETE_SUBSECTION, deleteSubSectionSaga);
}
