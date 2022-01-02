import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: "https://obscure-meadow-29718.herokuapp.com/api/"
  withCredentials: true,
  baseURL: "http://localhost:8800/api",
});
