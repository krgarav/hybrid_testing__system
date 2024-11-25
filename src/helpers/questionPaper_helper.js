import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Create course
export const createQuestionPaper = data => post(url.CREATE_QUESTIONPAPER, data);
export const updateQuestionPaper = data => put(url.UPDATE_QUESTIONPAPER, data);
export const deleteQuestionPaper = id => del(url.DELETE_QUESTIONPAPER + id);
export const fetchAllQuestionPapers = () => get(url.FETCH_ALL_QUESTIONPAPERS);

export const fetchAllQuestionOfPaper = id => get(url.FETCH_EXAM_PAPER + id);
export const deleteQuestionFromPaper = data => del(url.DELETE_QUESTION_FROM_PAPER + data.paperId + "&QuestionId=" + data.questionId)
export const fetchFilterQuestions = data => post(url.FETCH_FILTER_QUESTIONS, data);
export const addQuestionToPaper = data => post(url.ADD_QUESTION_TO_PAPER, data);

export const createMainExamPaper = data => post(url.CREATE_MAIN_EXAM_PAPER, data);
export const updateMainExamPaper = data => put(url.UPDATE_MAIN_EXAM_PAPER, data);
export const assingExamToStudent = data => post(url.ASSIGN_EXAM_TO_STUDENTS, data);

export const getResult = id => get(url.GET_EXAM_RESULT + id);
export const getResultDetails = data => get(url.GET_RESULT_DETAILS1 + data.studentId + url.GET_RESULT_DETAILS2 + data.examPaperId)
export const sendResult = id => post(url.SEND_EXAM_RESULT + id);


export const downloadQuestionPaperWithAnswer = id => get(url.DOWNLOAD_QUESTION_PAPER_WITH_ANSWER + id);
export const downloadQuestionPaperWithoutAnswer = id => get(url.DOWNLOAD_QUESTION_PAPER_WITHOUT_ANSWER + id);

export const ExamTypes = [
    { id: 0, name: "Offline Exam" },
    { id: 1, name: "Online Exam" },
    { id: 2, name: "Both" },
]
