import axios, { AxiosError, AxiosResponse } from "axios";
import { CityDTO, CountryDTO, ProvinceDTO } from "./dtos/address.dto";
import { LoginBody, User, UserBody } from "@/model/user/user.type";
import { CompleteUserDTO, UserDTO } from "./dtos/user.dto";

const API_URL = process.env.API_URL;

export interface UserRequest {
    getUser(userId: string): Promise<UserDTO | undefined>;
}

const getUser = async (userId: string): Promise<UserDTO | undefined> => {
    if (userId) {
        const userData: UserDTO = (await axios.get(`${API_URL}/auth/user?query=${userId}`)).data;
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