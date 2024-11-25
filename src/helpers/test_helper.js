import axios from "axios"
import { post, del, get, put, postWithFormData } from "./api_helper"
import * as url from "./url_helper"

// Create School
export const saveExamAnswers = data => post(url.SAVE_EXAM_ANSWERS, data);