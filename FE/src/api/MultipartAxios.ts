import baseAxios from "axios";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const accessToken = null;

const Axios = baseAxios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    accessToken: accessToken,
  },
});

export default Axios;
