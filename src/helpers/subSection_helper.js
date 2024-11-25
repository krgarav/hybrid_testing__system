import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"
import { toast } from "react-toastify";

// Create course
export const createSubSection = data => post(url.CREATE_SUBSECTION, data);
export const updateSubSection = data => put(url.UPDATE_SUBSECTION, data);
export const deleteSubSection = id => del(url.DELETE_SUBSECTION + id);
export const fetchAllSubSections = () => get(url.FETCH_ALL_SUBSECTIONS);
export const fetchAllSubSectionsBySection = id => post(url.FETCH_ALL_SUBSECTION_BY_SECTION, id); 


// // get all sections BY course
// export const fetchAllSubSectionsBySection = async (id) => {
    
//     try {
//         const { data } = await axios.post(url.FETCH_ALL_SUBSECTION_BY_SECTION + id);
//         if (data?.success) {
//             return data?.result;
//         }else{
//             toast.error(data?.message);
//         }
//     } catch (error) {
//         toast.error(error.response.data.message);
//     }

// }