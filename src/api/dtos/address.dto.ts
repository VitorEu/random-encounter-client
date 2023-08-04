interface CountryDTO {
    id: string;
    name: string;
    flag: string;
}

interface ProvinceDTO {
    id: string;
    name: string;
    countryId: string;
}

interface CityDTO {
    id: string;
    name: string;
    stateId: string;
    countryId: string;
}

interface AddressDTO {
    id: string;
    createdAt: Date;
    description: string;
    city: CityDTO;
    province: ProvinceDTO;
    country: CountryDTO;
}

export type {
    CountryDTO,
    ProvinceDTO,
    CityDTO,
    AddressDTO
}