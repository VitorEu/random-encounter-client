import axios, { AxiosError, AxiosResponse } from "axios";
import { CityDTO, CountryDTO, ProvinceDTO } from "./dtos/address.dto";
import { LoginBody, User, UserBody } from "@/model/user/user.type";
import { CompleteUserDTO, UserDTO } from "./dtos/user.dto";
import { api } from "./base.api";

export interface UserRequest {
    getUser(userId: string): Promise<UserDTO | undefined>;
}

const getUser = async (userId: string): Promise<UserDTO | undefined> => {
    if (userId) {
        const userData: UserDTO = (await api.get(`/auth/user?query=${userId}`)).data;
        if (userData) {
            return userData;
        } else {
            
        }
    } else return undefined;
}


const userRequest: UserRequest = {
    getUser,

}

export default userRequest;