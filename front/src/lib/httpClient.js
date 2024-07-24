import axios from "axios"
import { getToken } from "../utilis";



export const  httpClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
  });

