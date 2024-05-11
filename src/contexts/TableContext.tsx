import { Dispatch, FC, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { CompleteTableDTO } from "@/api/dtos/table.dto";
import { AuthContext } from "./AuthContext";
import tableRequest from "@/api/table.request";
import { error } from "@/utils/toast";


interface TableProps {
    children: any;
}

export interface TableMapperMask extends Partial<CompleteTableDTO> {
    isAddCard?: boolean;
}

interface TableContextData {
    ownedTableList: TableMapperMask[];
    
    creatingNewTable: boolean;
    setCreatingNewTable: Dispatch<SetStateAction<boolean>>;
}

export const TableContext = createContext({} as TableContextData)

export const TableProvider: FC<TableProps> = ({ children }) => {

    const [ownedTableList, setOwnedTableList] = useState<TableMapperMask[]>([]);
    const [creatingNewTable, setCreatingNewTable] = useState<boolean>(false);

    const { isAuthenticated, userData } = useContext(AuthContext);

    const fillOwnedTableList = async () => {
        try {
            if (userData) {
                const tablesResponse: TableMapperMask[] = await tableRequest.getOwnedTables(userData.id);

                tablesResponse.sort(({ table: tableA }: TableMapperMask, { table: tableB }: TableMapperMask) => 
                    tableA && tableB 
                        ? new Date(tableA.createdAt).getTime() - new Date(tableB.createdAt).getTime() 
                        : 0
                );

                tablesResponse.push({ isAddCard: true })

                setOwnedTableList(tablesResponse);
            }
        } catch (ex: any) {
            error("An error occurred when trying to retrieve your tables");
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fillOwnedTableList();
        }
    }, [])

    return (
        <TableContext.Provider value={{ ownedTableList, creatingNewTable, setCreatingNewTable }}>
            {children}
        </TableContext.Provider>
    )
}