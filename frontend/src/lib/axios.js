import axios from 'axios';
import { ENV } from './env';

export const axiosInstance = axios.create({
    baseURL: ENV.VIT_BASE_BE_URL,
    withCredentials: true,
})