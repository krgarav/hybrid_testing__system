import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Create Class
export const getAllCenters = () => get(url.FETCH_ALL_CENTERS);
export const centerAllocations = () => get(url.CENTER_ALLOCATION);
export const totalStudentsCenterCapacityCount = id => get(url.TOTAL_SUTDENTS_CENTER_CAPACITY_COUNT + id);
export const allocateRollNumberAndPassword = id => get(url.ALLOCATE_ROLL_NUMBER_AND_PASSWORD + id);
export const getAllMainExamPapers = () => get(url.GET_ALL_MAIN_EXAM_PAPERS);
export const deleteMainExamPaper = id => del(url.DELETE_MAIN_EXAM_PAPER + id);

export const getMainExamPapersByLanguage = id => get(url.GET_MAIN_EXAM_PAPERS_BY_LANGUAGE + id);