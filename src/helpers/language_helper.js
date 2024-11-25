import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Create course
export const createLanguage = data => post(url.CREATE_LANGUAGE, data);
export const updateLanguage = data => put(url.UPDATE_LANGUAGE, data);
export const deleteLanguage = id => del(url.DELETE_LANGUAGE + id);
export const fetchAllLanguages = () => get(url.FETCH_ALL_LANGUAGES);