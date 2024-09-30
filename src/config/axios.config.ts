import axios from "axios";

const axiosInstanceAPI = axios.create({
  baseURL: "http://localhost:1337/api",
});

export default axiosInstanceAPI;
