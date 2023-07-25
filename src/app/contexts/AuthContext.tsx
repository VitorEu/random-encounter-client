"use client"
import { LoginBody } from "@/model/user/user.type";
import { FC, createContext, useState } from "react";
import authRequest from "../_api/auth.request";
import { Secret, decode, verify } from 'jsonwebtoken';
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { error } from "../_utils/toast.config";


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

    const isAuthenticated = !!userData

    const signIn = async ({ email, password }: LoginBody): Promise<boolean> => {

        const { data, status } = await authRequest.signIn({ email, password });
        const { token } = data

        if (status === 201) {
            const payload: any = decode(token);

            setCookie(undefined, 're.token', token, {
                maxAge: 60 * 60 * 24 * 10 // 10 days
            })

            setUserData({
                id: payload.sub,
                email: payload.email,
                authorized: payload.authorized
            })

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