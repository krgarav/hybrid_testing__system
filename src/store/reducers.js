import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

import Breadcrumb from "./Breadcrumb/reducer";

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
//chat
import chat from "./chat/reducer";

//Calendar
import calendar from "./calendar/reducer"

//tasks
import tasks from "./tasks/reducer";

// class
import classesReducer from "./class/reducer";

// course
import coursesReducer from "./course/reducer";

// section 
import sectionsReducer from "./section/reducer";

// subSection 
import subSectionsReducer from "./subSection/reducer";

//  difficulty
import difficultysReducer from "./difficulty/reducer";

// language
import languagesReducer from "./language/reducer";

// question
import questionsReducer from "./question/reducer";

// question paper
import questionPapersReducer from "./questionPaper/reducer";

import userReducer from "./user/reducer";

import schoolReducer from "./school/reducer";

import test from "./test/test"

const rootReducer = combineReducers({
  // public
  Layout,
  //Breadcrumb items
  Breadcrumb,
  tasks,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  classesReducer,
  coursesReducer,
  sectionsReducer,
  subSectionsReducer,
  difficultysReducer,
  languagesReducer,
  questionsReducer,
  questionPapersReducer,
  userReducer,
  schoolReducer,
  test


})

export default rootReducer
