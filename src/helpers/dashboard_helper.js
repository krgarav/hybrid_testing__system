import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Create Class
export const getDashboardData = () => get(url.GET_DASHBOARD_DATA);