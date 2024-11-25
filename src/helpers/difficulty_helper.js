import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Create course
export const createDifficulty = data => post(url.CREATE_DIFFICULTY, data);
export const updateDifficulty = data => put(url.UPDATE_DIFFICULTY, data);
export const deleteDifficulty = id => del(url.DELETE_DIFFICULTY + id);
export const fetchAllDifficultys = () => get(url.FETCH_ALL_DIFFICULTYS);