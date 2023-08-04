import { AUTH_TOKEN } from "@/constants/app.auth";
import axios from "axios";
import { parseCookies } from "nookies";

export const getAPIClient = (ctx?: any) => {

    // const { AUTH_TOKEN: token } = parseCookies(ctx);
    const API_URL = process.env.API_URL;
    
    const api = axios.create({
        baseURL: API_URL,
    })
    
    if (typeof window !== "undefined") {
        const token = localStorage?.getItem(AUTH_TOKEN);
        if (token) {
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return api;
}