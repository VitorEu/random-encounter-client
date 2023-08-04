import axios from "axios";
import { CityDTO, CountryDTO, ProvinceDTO } from "./dtos/address.dto";
import { api } from "./base.api";

export interface AddressRequest {
    getCountryList(countryName: string | undefined): Promise<CountryDTO[]>;
    getStateList(country: string | undefined, state?: string | undefined): Promise<ProvinceDTO[]>;
    getCityList(city: string | undefined, state?: string | undefined): Promise<CityDTO[]>;
}

const getCountryList = async (countryName?: string | undefined): Promise<CountryDTO[]> => {
    if (!countryName) countryName = '';
    const countryList: CountryDTO[] = (await api.get(`/address/country?name=${countryName}`)).data
    return Promise.resolve(countryList);
}

const getStateList = async (country: string | undefined, state?: string | undefined): Promise<ProvinceDTO[]> => {
    if (!country) country = '';
    if (!state) state = '';
    const provinceList: ProvinceDTO[] = (await api.get(`/address/province?country=${country}`)).data
    return Promise.resolve(provinceList);
}

const getCityList = async (city: string | undefined, state?: string | undefined): Promise<CityDTO[]> => {
    if (!city) city = '';
    if (!state) state = '';
    const cityList: CityDTO[] = (await api.get(`/address/city?province=${state}`)).data
    return Promise.resolve(cityList);
}

const addressRequest: AddressRequest = {
    getCountryList,
    getStateList,
    getCityList
}

export default addressRequest;