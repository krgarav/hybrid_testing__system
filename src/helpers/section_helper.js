import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"
import { toast } from "react-toastify";

// Create course
export const createSection = data => post(url.CREATE_SECTION, data);
export const updateSection = data => put(url.UPDATE_SECTION, data);
export const deleteSection = id => del(url.DELETE_SECTION + id);
export const fetchAllSections = () => get(url.FETCH_ALL_SECTIONS);
export const fetchAllSectionsByCourse = data => post(url.FETCH_ALL_SECTION_BY_COURSE, data);


