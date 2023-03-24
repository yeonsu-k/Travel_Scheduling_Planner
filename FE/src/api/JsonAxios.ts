import baseAxios from "axios";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const Axios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  return config;
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 토큰 만료 시
    console.log("interceptor", error);
    return Promise.reject(error);
  },
);

export default Axios;
