import axios, { AxiosError, AxiosResponse } from "axios";
import { CityDTO, CountryDTO, ProvinceDTO } from "./dtos/address.dto";
import { LoginBody, User, UserBody } from "@/model/user/user.type";
import { api } from "./base.api";

const API_URL = process.env.API_URL;

export interface AuthRequest {
    registerUser(newUser: UserBody): Promise<AxiosResponse | undefined>;
    signIn(loginBody: LoginBody): Promise<any>;
}

const registerUser = async (newUser: UserBody): Promise<AxiosResponse | undefined> => {
    if (newUser) {
        const createdUser: AxiosResponse = (await api.post(`/auth/user`, newUser))
        return createdUser;
    } else return undefined;
}

const signIn = async ({ email, password }: LoginBody): Promise<any> => {
    try {
        if (email && password) {
            var signinResponse: any = (await api.post(`/auth/login`, { email, password }))
            return signinResponse;
        } else return undefined;
    } catch (ex: any) {
        return ex.response;
    }
}

const authRequest: AuthRequest = {
    registerUser,
    signIn
}

export default authRequest;