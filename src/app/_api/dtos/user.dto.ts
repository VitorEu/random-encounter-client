import { AddressDTO } from "./address.dto";

enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

interface UserDTO {
	id: string;
	createdAt?: Date;
	name: string;
	email: string;
	password?: string;
	role: Role;
	authorized?: boolean;
	addressId?: string;
}

interface CompleteUserDTO {
	user: UserDTO;
	address: AddressDTO;
}

export type {
	UserDTO,
	CompleteUserDTO
};
