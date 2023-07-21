import axios, { AxiosResponse } from "axios";
import { CityDTO, CountryDTO, ProvinceDTO } from "./dtos/address.dto";
import { User } from "@/model/user/user.type";

export interface AuthRequest {
    registerUser(newUser: any): Promise<AxiosResponse | undefined>;
}

const registerUser = async (newUser: any): Promise<AxiosResponse | undefined> => {
    if (newUser) {
        const createdUser: AxiosResponse = (await axios.post(`http://localhost:3001/auth/user`, newUser))
        return createdUser;
    } else return undefined;
}

const authRequest: AuthRequest = {
    registerUser
}

export default authRequest;