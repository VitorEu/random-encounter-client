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

export type {
    CountryDTO,
    ProvinceDTO
}