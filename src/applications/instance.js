import axios from "axios";
import { checkTokenValidity } from "./utils";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.request.use(async (request) => {
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (!token && !refresh_token) return request;
    request.headers.Authorization = `Bearer ${token}`;

    const isExpired = checkTokenValidity(token);
    if (!isExpired) return request;

    const { data } = await axios.post("http://localhost:3001/users/refresh", {
        refresh_token,
    });
    const { token: newAccessToken } = data;
    localStorage.setItem("token", newAccessToken);
    request.headers.Authorization = `bearer ${newAccessToken}`; 
    return request;
});