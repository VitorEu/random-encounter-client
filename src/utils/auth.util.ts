import authRequest from "@/api/auth.request";
import { api } from "@/api/base.api";
import { LoginBody } from "@/model/user/user.type";
import { decode } from "jsonwebtoken";
import { setCookie } from "nookies";
import { error } from "./toast";
import { AUTH_TOKEN } from "@/constants/app.auth";

/**
*
* @param LoginBody as LoginBody
* @returns boolean
*/
export const signIn = async ({ email, password }: LoginBody): Promise<boolean> => {

    const { data, status } = await authRequest.signIn({ email, password });
    const { token } = data;

    if (status === 201) {
        const payload: any = decode(token);

        localStorage?.setItem(AUTH_TOKEN, token);

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        return true;
    } else {
        switch (status) {
            case 401:
                error("Invalid credentials.")
                break;
            case 404:
                error("Email not found.")
                break;
        }

        return false;
    }
}