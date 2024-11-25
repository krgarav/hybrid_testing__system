import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga";
import tasksSaga from "./tasks/saga"
import classSaga from "./class/saga"
import courseSaga from "./course/saga"
import sectionSaga from "./section/saga"
import subSubSectionSaga from "./subSection/saga"
import difficultySaga from "./difficulty/saga"
import languageSaga from "./language/saga"
import questionSaga from "./question/saga"
import questionPaperSaga from "./questionPaper/saga"
import userSaga from "./user/saga"
import schoolSaga from "./school/saga"


export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    LayoutSaga(),
    fork(calendarSaga),
    fork(chatSaga),
    fork(tasksSaga),
    fork(tasksSaga),
    fork(classSaga),
    fork(courseSaga),
    fork(sectionSaga),
    fork(subSubSectionSaga),
    fork(difficultySaga),
    fork(languageSaga),
    fork(questionSaga),
    fork(questionPaperSaga),
    fork(userSaga),
    fork(schoolSaga),
  ])
}
