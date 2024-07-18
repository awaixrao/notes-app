import axios from "axios"

export const  httpClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

