import axios from "axios";

export const DEFAULT_AXIOS_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const apiClient = axios.create(DEFAULT_AXIOS_CONFIG);

export default apiClient;
