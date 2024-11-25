import axios from "axios"
import { post, del, get, put, postWithFormData, putWithFormData } from "./api_helper"
import * as url from "./url_helper"

// Create Organization
export const CreateOrganization = data => post(url.CREATE_ORGANIZATION, data);
export const getOrganization = id => get(url.GET_ORGANIZATION_BY_ID + id);
export const updateOrganization = data => putWithFormData(url.UPDATE_ORGANIZATION, data);