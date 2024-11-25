import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"
import { toast } from "react-toastify";

// Create course
export const createUser = data => post(url.CREATE_USER, data);
export const updateUser = data => put(url.UPDATE_USER, data);
export const deleteUser = id => del(url.DELETE_USER + id);
export const fetchAllUsers = () => get(url.FETCH_ALL_USERS);
export const fetchOtp = data => post(url.GET_OTP, data);
export const verifyOtp = data => post(url.VERIFY_OTP, data);
export const registerStudent = data => post(url.STUDENT_REGISTER, data);



export const getUserType = () => get(url.GET_USER_TYPE);

// export const getOtp = email => get(url.GET_OTP + email); 