import { CompleteUserDTO, UserDTO } from "./user.dto";

interface TableDTO {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    ownerId: string;
    systemId: string;
    imageUrl: string;
}

interface CompleteTableDTO {
    table: TableDTO;
    owner: CompleteUserDTO;
    players: UserDTO[];
}

export type {
    TableDTO,
    CompleteTableDTO
}