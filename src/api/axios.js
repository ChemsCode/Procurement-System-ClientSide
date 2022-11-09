import axios from 'axios';
const BASE_URL = 'https://soen-341-fall22.herokuapp.com'; //previously http://localhost:3500

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});