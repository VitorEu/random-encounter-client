"use client"
import { LoginBody } from "@/model/user/user.type";
import { FC, createContext, useEffect, useState } from "react";
import authRequest from "../_api/auth.request";
import { Secret, decode, verify } from 'jsonwebtoken';
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { error } from "../_utils/toast.config";
import { UserDTO } from "../_api/dtos/user.dto";
import userRequest from "../_api/user.requests";
import { api } from "../_api/base.api";


interface AuthProps {
    children: any;
}

interface AuthContextData {
    isAuthenticated: boolean;
    userData: UserGenData | null;
    signIn: (loginBody: LoginBody) => Promise<boolean>;
}

interface UserGenData {
    id: string;
    email: string;
    authorized: boolean;
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider: FC<AuthProps> = ({ children }) => {

    const [userData, setUserData] = useState<UserGenData | null>(null);

    const [completeUserData, setCompleteUserData] = useState<UserDTO>()

    const isAuthenticated = !!userData

    const fillCompleteUserData = async (userId: string) => {
        setCompleteUserData(await userRequest.getUser(userId));
    }

    useEffect(() => {
        const { 're.token': token } = parseCookies();
        const payload: any = decode(token);

        if (token) {
            setUserData({
                id: payload.sub,
                email: payload.email,
                authorized: payload.authorized
            })

            fillCompleteUserData(payload.sub);
        }
    }, [])

    const signIn = async ({ email, password }: LoginBody): Promise<boolean> => {

        const { data, status } = await authRequest.signIn({ email, password });
        const { token } = data;

        if (status === 201) {
            const payload: any = decode(token);

            setCookie(undefined, 're.token', token, {
                maxAge: 60 * 60 * 24 * 10 // 10 days
            });

            setUserData({
                id: payload.sub,
                email: payload.email,
                authorized: payload.authorized
            });

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

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, userData }}>
            {children}
        </AuthContext.Provider>
    )
}