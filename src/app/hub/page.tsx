'use client'
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { TableContext } from "@/contexts/TableContext";
import './grid.css'
import { HubNavBar } from "@/components/HubNavBar";
import { TableCard } from "@/components/TableCard";

export default function Page() {

    const { isAuthenticated } = useContext(AuthContext)
    const { ownedTableList } = useContext(TableContext)

    const Router = useRouter();

    useEffect(() => { if (!isAuthenticated) Router.push("/") }, []);

    const getOwnedTables = (): JSX.Element[] => 
        ownedTableList.map(completeTable => 
            <TableCard completeTable={completeTable} key={completeTable.table?.id} />
        )

    return (
        <main className="wrapper h-[90vh]">
            <div className="bg-[--lead] table-selector table-selector-inner-wrapper h-full overflow-y-auto">
                {getOwnedTables()}
            </div>

            <div className="bg-[var(--scarned-lead)] sidebar p-3 shadow-xl min-w-[200px]">
                <HubNavBar/>
            </div>
        </main>
    );
}
