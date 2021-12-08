import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://obscure-meadow-29718.herokuapp.com/api/"
    // baseURL: "http://localhost:8080/api",
    
});
