import axios from "axios";
import { parseCookies } from "nookies";

export const getAPIClient = (ctx?: any) => {

    const { 'ra.token': token } = parseCookies(ctx);

    const API_URL = process.env.API_URL;

    const api = axios.create({
        baseURL: API_URL,
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}