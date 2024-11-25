import axios from "axios"
import { post, del, get, put, postWithFormData, putWithFormData } from "./api_helper"
import * as url from "./url_helper"

// Create course
export const createQuestion = data => postWithFormData(url.CREATE_QUESTION, data);
export const updateQuestion = data => putWithFormData(url.UPDATE_QUESTION, data);
export const deleteQuestion = id => del(url.DELETE_QUESTION + id);
export const fetchAllQuestions = () => get(url.FETCH_ALL_QUESTIONS);
export const bulkCreateQuestion = data => postWithFormData(url.BULK_CREATE_QUESTION, data);
export const fetchSingleQuestion = id => get(url.FETCH_SINGLE_QUESTION + id);

export const createQuestionPaper = data => postWithFormData(url.CREATE_QUESTIONPAPER, data);

export const fetchOperatorQuestions = () => get(url.GET_OPERATOR_QUESTION);