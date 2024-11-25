import axios from "axios"
import { post, del, get, put, postWithFormData } from "./api_helper"
import * as url from "./url_helper"

// Create School
export const uploadStudents = data => postWithFormData(url.UPLOAD_STUDENTS, data);
export const loginStudentWithCred = data => post(url.LOGIN_STUDENT, data);
export const getAllStudents = () => get(url.GET_ALL_STUDENT);
export const getStudentsForMapping = () => get(url.GET_STUDENTS_FOR_MAPPING);
