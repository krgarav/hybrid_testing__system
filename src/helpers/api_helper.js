import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import { toast } from "react-toastify";



//pass new generated access token here


//apply base url for axios
const API_URL = "";

const axiosApi = axios.create({
  baseURL: API_URL,
});
// const data = localStorage.getItem('authUser');
// const parseData = JSON.parse(data);
// const token = parseData?.token;
// axiosApi.defaults.headers.common["Authorization"] = "Bearer " + token;

export const updateToken = () => {
  axiosApi.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem('authUser'))?.token;
}
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

updateToken();

export async function get(url, config = {}) {

  try {
    const response = await axiosApi.get(url, { ...config });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = '/logout'; // Redirect to /logout
    }
    else {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    // You can throw the error if you want it to be handled elsewhere
    // throw error;
  }
}

export async function postWithFormData(url, data, config = {}) {
  // console.log("from the post--->", data);
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data).catch((error) => {
      toast.error(error?.response?.data.message)
    });
}
export async function post(url, data, config = {}) {
  // console.log("from the post--->", data);
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data).catch((error) => {
      toast.error(error?.response?.data.message)
    });
}

export async function putWithFormData(url, data, config = {}) {
  return axiosApi
    .put(url, data, { ...config })
    .then((response) => response.data).catch((error) => {
      toast.error(error?.response?.data.message)
    });
}
export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data).catch((error) => {
      toast.error(error?.response?.data.message)
    });
}

export async function del(url, config = {}) {
  console.log("from the del --->", url)
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data).catch((error) => {
      toast.error(error?.response?.data.message)
    });
}
