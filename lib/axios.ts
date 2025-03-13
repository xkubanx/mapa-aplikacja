import axios from "axios";
export const API_URL = process.env.API_URL;
export const TIMEOUT_MS = 30000;
export const DEFAULT_HEADERS = {'Content-Type': 'application/json'};
export const api = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT_MS,
    headers: DEFAULT_HEADERS,
    withCredentials: true})