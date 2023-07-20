import axios from "axios";
import { CountryDTO, ProvinceDTO } from "./dtos/address.dto";

export interface AddressRequest {
    getCountryList(countryName: string | undefined): Promise<CountryDTO[]>;
    getStateList(country: string | undefined, state?: string | undefined): Promise<ProvinceDTO[]>;
}

const getCountryList = async (countryName?: string | undefined): Promise<CountryDTO[]> => {
    if (!countryName) countryName = '';
    const countryList: CountryDTO[] = (await axios.get(`http://192.168.5.131:3001/address/country?name=${countryName}`)).data
    return Promise.resolve(countryList);
}

const getStateList = async (country: string | undefined, state?: string | undefined): Promise<ProvinceDTO[]> => {
    if (!country) country = '';
    if (!state) state = '';
    const provinceList: ProvinceDTO[] = (await axios.get(`http://192.168.5.131:3001/address/province?country=${country}`)).data
    return Promise.resolve(provinceList);
}

const addressRequest: AddressRequest = {
    getCountryList,
    getStateList
}

export default addressRequest;