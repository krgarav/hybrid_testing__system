import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Create School
export const createSchool = data => post(url.CREATE_SCHOOL, data);
export const updateSchool = data => put(url.UPDATE_SCHOOL, data);
export const deleteSchool = id => del(url.DELETE_SCHOOL + id);
export const fetchAllSchools = () => get(url.FETCH_ALL_SCHOOL);
export const fetchSchoolTypes = () => get(url.FETCHS_SCHOOL_TYPES);



export const ExamCenters = [
    { id: 1, name: "Yes", value: true },
    { id: 0, name: "NO", value: false },
]

export const SchoolTypes = [
    { id: 1, name: "public" },
    { id: 2, name: "private" },
    { id: 3, name: "Defense" },
    { id: 4, name: "International" },
    { id: 5, name: "Community" },
    { id: 6, name: "Mission" },
    { id: 7, name: "Chruch" },
    { id: 8, name: "Mosque" },
    { id: 9, name: "Special Boarding School" },
    { id: 10, name: "Others" },
]