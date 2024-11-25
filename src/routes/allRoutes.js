import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

//Email
import EmailInbox from "../pages/Email/email-inbox"
import EmailRead from "../pages/Email/email-read"
import EmailCompose from "../pages/Email/email-compose"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Class
import CreateClass from "pages/Class/CreateClass";
import AllClasses from "pages/Class/AllClasses";

//Course
import CreateCourse from "pages/Course/CreateCourse";
import AllCourses from "pages/Course/AllCourses";

//Section
import CreateSection from "pages/Section/CreateSection";
import AllSection from "pages/Section/AllSection";

//Sub Section
import CreateSubSection from "pages/SubSection/CreateSubSection";
import AllSubSection from "pages/SubSection/AllSubSection";

// Difficulty 
import CreateDifficulty from "pages/Difficulty/CreateDifficulty"
import AllDifficulty from "pages/Difficulty/AllDifficulty"

//Question
import CreateQuestion from "pages/Question/CreateQuestion"
import AllQuestions from "pages/Question/AllQuestions"

//Charts
import ChartsAppex from "../pages/Charts/charts-appex";
import ChartsJs from "../pages/Charts/charts-chartjs";
import ChartsKnob from "../pages/Charts/charts-knob";
import ChartsC3 from "../pages/Charts/charts-c3";
import ChartsSparkLine from "../pages/Charts/charts-sparkline";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"

//Icons
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import Iconion from "../pages/Icons/Iconion"
import IconFontawesome from "../pages/Icons/IconFontawesome"
import IconThemify from "../pages/Icons/IconThemify"
import IconDripicons from "../pages/Icons/IconDripicons"
import IconTypicons from "../pages/Icons/IconTypicons"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormUpload from "../pages/Forms/FormUpload"
import FormXeditable from "../pages/Forms/FormXeditable"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiBadge from "../pages/Ui/UiBadge"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiPagination from "../pages/Ui/UiPagination"
import UiPopoverTooltips from "../pages/Ui/UiPopoverTooltips"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"

//Extra Pages
import PagesTimeline from "../pages/Extra Pages/pages-timeline";
import PagesInvoice from "../pages/Extra Pages/pages-invoice";
import PagesDirectory from "../pages/Extra Pages/pages-directory";
import PagesBlank from "../pages/Extra Pages/pages-blank";
import Pages404 from "../pages/Extra Pages/pages-404";
import Pages500 from "../pages/Extra Pages/pages-500";
import UiUtilities from "pages/Ui/UiUtilities"
import UiColors from "pages/Ui/UiColors"
import UiOffcanvas from "pages/Ui/UiOffcanvas"
import Chat from "pages/Chat/Chat";
import Kanban from "pages/Kanban"
import BulkCreateQuestion from "pages/Question/BulkCreateQuestion"
import CreateQuestionPaper from "pages/Question Paper/CreateQuestionPaper"
import AllQuestionPapers from "pages/Question Paper/AllQuestionPapers"
import ExamPaperDetails from "pages/Question Paper/ExamPaperDetails"
import CreateUser from "pages/User/CreateUser"
import AllUsers from "pages/User/AllUsers"
import CreateSchool from "pages/School/CreateSchool"
import AllSchool from "pages/School/AllSchool"
import CreateStudents from "pages/student/CreateStudents"
import CenterAllocation from "pages/Exam Managment/CenterAllocation"
import CreateExam from "pages/Exam Managment/CreateExam"
import AllExams from "pages/Exam Managment/AllExams"
import StudentRegister from "pages/Authentication/StudentRegister"
import CreateLanguage from "pages/language/CreateLanguage"
import AllLanguage from "pages/language/AllLanguage"
import StudentLogin from "pages/student/StudentLogin"
import RegisterOrganization from "pages/Organization/RegisterOrganization"
import ProfileMenu from "components/CommonForBoth/TopbarDropdown/ProfileMenu"
import Result from "pages/Exam Managment/Result"
import CreateQuestionUsingAi from "pages/Question/CreateQuestionUsingAi"
import AllStudents from "pages/student/AllStudents"
import ExamProctor from "pages/Exam Managment/ExamProctor"
import Workflow from "pages/QBWorkflow/Workflow"
import Package from "pages/Package/Package"
import PaymentFailPage from "pages/Package/PaymentFailPage"
import PaymentSuccessPage from "pages/Package/PaymentSuccessPage"
import WorkflowTask from "pages/QBWorkflow/WorkflowTask"
import QcQuestions from "pages/QBWorkflow/QcQuestions"
import QcReturnQuestion from "pages/Question/QcReturnQuestion"

const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // class
  { path: "/create-class", component: <CreateClass /> },
  { path: "/all-classes", component: <AllClasses /> },

  // course
  { path: "/create-course", component: <CreateCourse /> },
  { path: "/all-courses", component: <AllCourses /> },

  // section
  { path: "/create-section", component: <CreateSection /> },
  { path: "/all-sections", component: <AllSection /> },

  // sub section
  { path: "/create-subSection", component: <CreateSubSection /> },
  { path: "/all-subSections", component: <AllSubSection /> },

  // difficulty
  { path: "/create-difficulty", component: <CreateDifficulty /> },
  { path: "/all-difficultys", component: <AllDifficulty /> },

  // language
  { path: "/create-language", component: <CreateLanguage /> },
  { path: "/all-languages", component: <AllLanguage /> },

  // question
  { path: "/create-question", component: <CreateQuestion /> },
  { path: "/create-question-using-ai", component: <CreateQuestionUsingAi /> },
  { path: "/create-question-using-csv", component: <BulkCreateQuestion /> },
  { path: "/all-questions", component: <AllQuestions /> },
  { path: "/qc-return-questions", component: <QcReturnQuestion /> },


  // question paper
  { path: "/create-question-paper", component: <CreateQuestionPaper /> },
  { path: "/all-question-papers", component: <AllQuestionPapers /> },
  { path: "/exam-details/:id", component: <ExamPaperDetails /> },

  // QB Workflow 
  { path: "/qb-workflow", component: <Workflow /> },
  { path: "/workflow-task", component: <WorkflowTask /> },
  { path: "/qc-questions/:userId", component: <QcQuestions /> },

  // question paper
  { path: "/create-new-user", component: <CreateUser /> },
  { path: "/all-users", component: <AllUsers /> },

  // question paper
  { path: "/create-new-school", component: <CreateSchool /> },
  { path: "/all-school", component: <AllSchool /> },

  // question paper
  { path: "/upload-students", component: <CreateStudents /> },
  { path: "/all-students", component: <AllStudents /> },



  // exam managment
  { path: "/create-exam", component: <CreateExam /> },
  { path: "/all-exams", component: <AllExams /> },
  { path: "/center-alloction", component: <CenterAllocation /> },
  { path: "/result", component: <Result /> },
  { path: "/proctoring/:roomId", component: <ExamProctor /> },



  { path: "/profile", component: <UserProfile /> },

  { path: "/package", component: <Package /> },

  { path: "/paymentFail", component: <PaymentFailPage /> },
  { path: "/paymentSuccess", component: <PaymentSuccessPage /> },



  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]

const authRoutes = [
  { path: "/logout", component: <Logout /> },

  { path: "/login", component: <Login /> },
  { path: "/student-login", component: <StudentLogin /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <RegisterOrganization /> },
  { path: "/student-register", component: <StudentRegister /> },

  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },

  // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  // { path: "/pages-register", component: <Register1 /> },
  // { path: "/page-recoverpw", component: <Recoverpw /> },
  // { path: "/auth-lock-screen", component: <LockScreen /> },
]

export { userRoutes, authRoutes }