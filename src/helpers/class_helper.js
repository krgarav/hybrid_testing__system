import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Create Class
export const createClass = data => post(url.CREATE_CLASS, data);
export const updateClass = data => put(url.UPDATE_CLASS, data);
export const deleteClass = id => del(url.DELETE_CLASS+ id);
export const fetchAllClasses = () => get(url.FETCH_ALL_CLASSES);