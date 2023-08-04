import { LoginBody } from "@/model/user/user.type";
import { FC, createContext, useEffect, useState } from "react";
import authRequest from "../api/auth.request";
import { Secret, decode, verify } from 'jsonwebtoken';
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { error } from "../utils/toast";
import { UserDTO } from "../api/dtos/user.dto";
import userRequest from "../api/user.requests";
import { api } from "../api/base.api";
import { APP_ROUTES } from "@/constants/app.routes";
import { AUTH_TOKEN } from "@/constants/app.auth";


interface AuthProps {
    children: any;
}

interface AuthContextData {
    isAuthenticated: boolean;
    userData: UserGenData | null;
    completeUserData: UserDTO | undefined;
    signOut: () => Promise<void>;
}

interface UserGenData {
    id: string;
    email: string;
    authorized: boolean;
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider: FC<AuthProps> = ({ children }) => {

    const [userData, setUserData] = useState<UserGenData | null>(null);

    const [completeUserData, setCompleteUserData] = useState<UserDTO | undefined>()

    const isAuthenticated = !!userData

    const fillCompleteUserData = async (userId: string) => {
        setCompleteUserData(await userRequest.getUser(userId));
    }

    const Router = useRouter();

    useEffect(() => {
        // const { AUTH_TOKEN: token } = parseCookies();
        const token = localStorage?.getItem(AUTH_TOKEN);

        if (token) {
            const payload: any = decode(token);
            setUserData({
                id: payload.sub,
                email: payload.email,
                authorized: payload.authorized
            })

            fillCompleteUserData(payload.sub);
        } else {
            Router.push(APP_ROUTES.public.signin.path);
        }
    }, [])

    const signOut = async () => {
        setUserData(null);
        setCompleteUserData(undefined);
        // setCookie(null, "re.token", "", {
        //     path: "/",
        //     maxAge: -1
        // })
        localStorage.removeItem(AUTH_TOKEN);
        api.defaults.headers["Authorization"] = "";

        Router.push(APP_ROUTES.public.signin.path);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signOut, userData, completeUserData }}>
            {!isAuthenticated && null}
            {isAuthenticated && children}
        </AuthContext.Provider>
    )
}