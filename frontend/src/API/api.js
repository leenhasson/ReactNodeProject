import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000', // backend URL
    withCredentials: true, // Ensure cookies & sessions are included in requests
});

export default instance;
