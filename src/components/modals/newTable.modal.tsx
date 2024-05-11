import { FormEvent, useContext, useState } from "react";
import { BaseModal } from "../BaseModal"
import { TableContext } from "@/contexts/TableContext";
import { InputText } from "../InputText";
import { SystemDTO } from "@/api/dtos/system.dto";
import { TableDTO } from "@/api/dtos/table.dto";
import { Table } from "@/model/table/table.type";
import capitalize from "capitalize";

interface NewTableModalProps {

}

export const NewTableModal = ({}: NewTableModalProps) => {

    const { creatingNewTable, setCreatingNewTable } = useContext(TableContext);

    const [newTable, setNewTable] = useState<Table>({} as Table);
    const [systemsList, setSystemsList] = useState<SystemDTO[]>([]);

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();
        
    }

    return (
        <BaseModal
            isOpened={creatingNewTable}
            closeAction={setCreatingNewTable}
            title="Create New Table">
            <form
                autoComplete="false"
                className="h-full w-[200%] flex justify-center mt-14 "
                onSubmit={(event) => submitForm(event)}>
                
                <div className="ml-[-15%]">
                    <InputText
                        value={newTable.title}
                        title="Title"
                        darkMode
                        wClass="min-w-[200%] capitalize"
                        onChange={(value: string) => {
                            newTable.title = capitalize(value);
                            setNewTable(newTable);
                        }}
                        required
                    />
                </div>

            </form>
        </BaseModal>
    )
}