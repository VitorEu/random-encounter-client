import { FC, createContext, useContext, useEffect, useState } from "react";
import { CompleteTableDTO } from "@/api/dtos/table.dto";
import { AuthContext } from "./AuthContext";
import tableRequest from "@/api/table.request";
import { error } from "@/utils/toast";


interface TableProps {
    children: any;
}

interface TableContextData {
    ownedTableList: CompleteTableDTO[]
}

export const TableContext = createContext({} as TableContextData)

export const TableProvider: FC<TableProps> = ({ children }) => {

    const [ownedTableList, setOwnedTableList] = useState<CompleteTableDTO[]>([]);

    const { isAuthenticated, userData } = useContext(AuthContext);

    const fillOwnedTableList = async () => {
        try {
            if (userData) {
                const tablesResponse: CompleteTableDTO[] = await tableRequest.getOwnedTables(userData.id);

                tablesResponse.sort(({ table: tableA }: CompleteTableDTO, { table: tableB }: CompleteTableDTO) => {
                    return new Date(tableA.createdAt).getTime() - new Date(tableB.createdAt).getTime()
                });
                
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
        <TableContext.Provider value={{ ownedTableList }}>
            {children}
        </TableContext.Provider>
    )
}