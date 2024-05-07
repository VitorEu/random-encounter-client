import { api } from "./base.api";
import { CompleteTableDTO } from "./dtos/table.dto";

const API_URL = process.env.API_URL;

export interface TableRequest {
    getOwnedTables(ownerId: string): Promise<CompleteTableDTO[]>;
}

const getOwnedTables = async (ownerId: string): Promise<CompleteTableDTO[]> => {
    if (ownerId){
        return (await api.get(`${API_URL}/table/owner/${ownerId}`)).data;
    } else return []
} 

const tableRequest: TableRequest = {
    getOwnedTables
}

export default tableRequest;