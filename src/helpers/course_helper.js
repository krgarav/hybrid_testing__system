import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"
import { toast } from "react-toastify";

// Create course
export const createCourse = data => post(url.CREATE_COURSE, data);
export const updateCourse = data => put(url.UPDATE_COURSE, data);
export const deleteCourse = id => del(url.DELETE_COURSE + id);
export const fetchAllCourses = () => get(url.FETCH_ALL_COURSES);
export const fetchAllCoursesByClass = id => get(url.FETCH_ALL_COURSE_BY_CLASS + id);


// get all courses BY CLASS
// export const fetchAllCoursesByClass = async (id) => {
    
//         try {
//             const { data } = await axios.post(url.FETCH_ALL_COURSE_BY_CLASS + id);
//             if (data?.success) {
//                 return data?.result;
//             }else{
//                 toast.error(data?.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
    
// }