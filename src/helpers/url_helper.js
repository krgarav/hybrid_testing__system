let url = "http://192.168.0.54:82/api/";
export let url_online = "https://api1.is10live.com";
// export let url_online = "https://4wq09l1k-5290.inc1.devtunnels.ms";
export const BACKEND_SPRING = false;


// export const LOGOUT_URL = "http://192.168.1.37:5173/login";
export const LOGOUT_URL = "http://localhost:5173/login";
// export const LOGOUT_URL = "https://is10live.com/login";

export const APP_ID = 'ca1a62e87d8f42b29fdad74c9e1ee584';

//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
// export const POST_LOGIN = "http://localhost:8000/api/v1/auth/login"
export const POST_LOGIN = url_online + "/Login"
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"
export const STUDENT_REGISTER = url_online + "/RegisterStudent";

// using .Net
export const CREATE_CLASS = url_online + "/CreateClass"
export const DELETE_CLASS = url_online + "/RemoveClass?Id="
export const UPDATE_CLASS = url_online + "/UpdateClass"
export const FETCH_ALL_CLASSES = url_online + "/GetClass"


// using .net
export const CREATE_COURSE = url_online + "/CreateCourse"
export const DELETE_COURSE = url_online + "/RemoveCourse?Id="
export const UPDATE_COURSE = url_online + "/UpdateCourse"
export const FETCH_ALL_COURSES = url_online + "/GetCourse"
export const FETCH_ALL_COURSE_BY_CLASS = url_online + "/GetCourseByClass?id="




// using .net 
export const CREATE_SECTION = url_online + "/CreateSection"
export const DELETE_SECTION = url_online + "/RemoveSection?Id="
export const UPDATE_SECTION = url_online + "/UpdateSection"
export const FETCH_ALL_SECTIONS = url_online + "/GetSection"
export const FETCH_ALL_SECTION_BY_COURSE = url_online + "/GetSectionByCourse"


// using .net 
export const CREATE_SUBSECTION = url_online + "/CreateSubSection"
export const DELETE_SUBSECTION = url_online + "/RemoveSubSection?Id="
export const UPDATE_SUBSECTION = url_online + "/UpdateSubSection"
export const FETCH_ALL_SUBSECTIONS = url_online + "/GetSubSection"
export const FETCH_ALL_SUBSECTION_BY_SECTION = url_online + "/GetSubSectionBySection"

// difficulty
// using .net
export const CREATE_DIFFICULTY = url_online + "/CreateDifficulty"
export const DELETE_DIFFICULTY = url_online + "/RemoveDifficulty?Id="
export const UPDATE_DIFFICULTY = url_online + "/UpdateDifficulty"
export const FETCH_ALL_DIFFICULTYS = url_online + "/GetDifficulty"


export const CREATE_LANGUAGE = url_online + "/AddLanguage"
export const DELETE_LANGUAGE = url_online + "/RemoveLanguage?Id="
export const UPDATE_LANGUAGE = url_online + "/UpdateLanguage"
export const FETCH_ALL_LANGUAGES = url_online + "/GetLanguages"


// using .net
// export const CREATE_QUESTION = url_online + "QuestionBankAPI/CreateQuestion"
export const CREATE_QUESTION = url_online + "/CreateQuestion"
export const BULK_CREATE_QUESTION = url_online + "/BulkQuestionCreate"
export const DELETE_QUESTION = url_online + "/RemoveQuestion?Id="
export const UPDATE_QUESTION = url_online + "/UpdateQuestion"
export const FETCH_ALL_QUESTIONS = url_online + "/GetQuestions"
export const FETCH_SINGLE_QUESTION = url_online + "/GetSingleQuestions?Id=";
export const QUESTION_CSV_FILE_FORMAT = url_online + "/GetQuestionDemoFormat";
export const STUDENT_CSV_FILE_FORMAT = url_online + "/GetStudentDemoFormat";

// image 
// using .net 
export const IMAGE_FETCH = url_online + "/GetImage?imageName=";



// Question Paper
export const CREATE_QUESTIONPAPER = url_online + "/CreateQuestionPaper";
export const UPDATE_QUESTIONPAPER = url_online + "/UpdateQuestionPaper";
export const DELETE_QUESTIONPAPER = url_online + "/DeleteExamPaper?Id=";
export const FETCH_ALL_QUESTIONPAPERS = url_online + "/GetExamPapers";
export const FETCH_EXAM_PAPER = url_online + "/GetExamPapersById?Id=";
export const DELETE_QUESTION_FROM_PAPER = url_online + "/DeleteExamQuestion?PaperId=";
export const FETCH_FILTER_QUESTIONS = url_online + "/GetFilterQuestions";
export const ADD_QUESTION_TO_PAPER = url_online + "/AddQuestionToPaper";
export const DOWNLOAD_QUESTION_PAPER_WITH_ANSWER = url_online + "/DownloadQuestionPaperWithAnswer?paperId=";
export const DOWNLOAD_QUESTION_PAPER_WITHOUT_ANSWER = url_online + "/DownloadQuestionPaperWithoutAnswer?paperId=";
export const GET_OPERATOR_QUESTION = url_online + "/GetOperatorQuestions";

// QB Workflow

export const CREATE_WORKFLOW_TREE = url_online + "/CreateUserTree";
export const UPDATE_WORKFLOW_TREE = url_online + "/UpdateUserTree";
export const DELETE_WORKFLOW_TREE = url_online + "/DeleteUserTree?Id=";
export const GET_ALL_WORKFLOW_TREE = url_online + "/GetUserTree";
export const GET_SINGLE_WORKFLOW_TREE = url_online + "/GetUserTreeById?id="
export const GET_USER_TREE_BY_USER = url_online + "/GetUserTreeByUser";
export const GET_QUESTION_FOR_QC = url_online + "/GetQuestionsForQC?moderatorId=";
export const RETURN_QUESTION = url_online + "/UpdateQCforQuestion";

// USER 
// using .net
export const CREATE_USER = url_online + "/UserRegister"
export const DELETE_USER = url_online + "/RemoveDifficulty?Id="
export const UPDATE_USER = url_online + "/UpdateUser"
export const FETCH_ALL_USERS = url_online + "/GetUsers"
export const GET_USER_TYPE = url_online + "/GetUserType"
export const GET_OTP = url_online + "/GetOTP"
export const VERIFY_OTP = url_online + "/VerifyOTP"


// SCHOOL 
// using .Net
export const CREATE_SCHOOL = url_online + "/CreateSchool"
export const DELETE_SCHOOL = url_online + "/RemoveClass?Id="
export const UPDATE_SCHOOL = url_online + "/UpdateSchool"
export const FETCH_ALL_SCHOOL = url_online + "/GetAllSchools"
export const FETCHS_SCHOOL_TYPES = url_online + "/GetSchoolTypes"

export const UPLOAD_STUDENTS = url_online + "/BulkStudentUploads";
export const GET_ALL_STUDENT = url_online + "/GetAllStudents";
export const GET_STUDENTS_FOR_MAPPING = url_online + "/GetStudentsForMapping";
export const LOGIN_STUDENT = url_online + "/StudentLogin";


//Exam
export const SAVE_EXAM_ANSWERS = url_online + "/saveExamAnswers"
export const GET_EXAM_RESULT = url_online + "/GetExamResult?Id="
export const GET_RESULT_DETAILS1 = url_online + "/GetResultDetails?StudentId="
export const GET_RESULT_DETAILS2 = "&ExamPaperId="
export const SEND_EXAM_RESULT = url_online + "/SendExamResult?ExamPaperId="
export const DOWNLOAD_EXAM_PAPER = url_online + "/DownloadExamPaperQuestions?paperId="

// exam managment
export const FETCH_ALL_CENTERS = url_online + "/GetAllCenters";
export const CENTER_ALLOCATION = url_online + "/GetCenterAllocated";
export const TOTAL_SUTDENTS_CENTER_CAPACITY_COUNT = url_online + "/GetCountOfCenterStudents?PaperId=";
export const ALLOCATE_ROLL_NUMBER_AND_PASSWORD = url_online + "/AllocateRollNoAndPassword?PaperId=";
export const CREATE_MAIN_EXAM_PAPER = url_online + "/CreateMainExamPaper";
export const UPDATE_MAIN_EXAM_PAPER = url_online + "/UpdateMainExamPaper"
export const GET_ALL_MAIN_EXAM_PAPERS = url_online + "/GetMainExamPapers";
export const DELETE_MAIN_EXAM_PAPER = url_online + "/DeleteMainExamPaper?Id=";
export const GET_MAIN_EXAM_PAPERS_BY_LANGUAGE = url_online + "/GetExamPaperByLanguage?Id=";
export const ASSIGN_EXAM_TO_STUDENTS = url_online + "/AssignExamToStudents";


// Payments
export const INITIATE_CHECKOUT_PAYMENT = url_online + "/InitiateCheckoutPayment";


// Dashboard
export const GET_DASHBOARD_DATA = url_online + "/DashboardData"










const url2 = "https://4wq09l1k-5290.inc1.devtunnels.ms"






//organization
export const CREATE_ORGANIZATION = url2 + "/CreateOrganization";
export const GET_ORGANIZATION_BY_ID = url_online + "/GetOrganizationById?Id=";
export const UPDATE_ORGANIZATION = url_online + "/UpdateOrganization";







//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats";
export const GET_GROUPS = "/groups";
export const GET_CONTACTS = "/contacts";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "/add/messages";
export const DELETE_MESSAGE = "/delete/message";

//TASKS
export const GET_TASKS = "/tasks";
export const DELETE_KANBAN = "/delete/tasks"
export const ADD_CARD_DATA = "/add/tasks"
export const UPDATE_CARD_DATA = "/update/tasks"
