import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"
import { toast } from "react-toastify";

// Create course
export const createWorkflowTree = data => post(url.CREATE_WORKFLOW_TREE, data);
export const updateWorkflowTree = data => put(url.UPDATE_WORKFLOW_TREE, data);
export const deleteWorkflowTree = id => del(url.DELETE_WORKFLOW_TREE + id);
export const fetchAllWorkflowTree = () => get(url.GET_ALL_WORKFLOW_TREE);
export const fetchSingleWorkflowTree = () => get(url.GET_SINGLE_WORKFLOW_TREE);
export const getChild = () => get(url.GET_USER_TREE_BY_USER);
export const fetchQuestionForQc = id => get(url.GET_QUESTION_FOR_QC + id);
export const returnQuestion = data => put(url.RETURN_QUESTION, data);
