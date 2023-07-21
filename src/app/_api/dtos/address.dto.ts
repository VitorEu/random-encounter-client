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

export type {
    CountryDTO,
    ProvinceDTO,
    CityDTO
}