'use client'
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { TableContext } from "@/contexts/TableContext";
import { FaDungeon, FaImage, FaPlugCirclePlus, FaPlus } from "react-icons/fa6";
import { Button } from "@/components/Button";
import Tilt from 'react-parallax-tilt';
import './grid.css'

export default function Page() {

    const { isAuthenticated } = useContext(AuthContext)
    const { ownedTableList } = useContext(TableContext)

    const [showTableLabel, setShowTableLabel] = useState<boolean>(false);

    const Router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            Router.push("/")
        }
    }, []);

    const getOwnedTables = (): JSX.Element[] => {

        const mappedOwnedTables: JSX.Element[] = ownedTableList.map(table => {
            return (
                <Tilt
                    tiltReverse
                    scale={1.1}
                    className="w-1/4 h-[33vh] bg-[var(--darkest-purple)] rounded-md flex flex-col items-center justify-start p-3 pb-0 transition-all cursor-pointer hover:brightness-90 card-tilt z-50 border-[1px] border-[var(--dark-purple)]">
                    <div className="h-[80%] w-[100%] bg-[var(--darkest-mint)] hover:brightness-105 transition rounded-md flex flex-row justify-center items-center shadow-inset">
                        <FaImage size={96} className="text-[var(--light-mint)]" />
                    </div>
                    <div className="h-[20%] w-[100%] text-[var(--lightest-mint)] flex flex-col justify-center items-center bold uppercase tracking-[0.0125rem] card-sense select-none">
                        {table.table.title}
                    </div>
                </Tilt>
            )
        })

        return mappedOwnedTables;
    }

    return (
        <main className="wrapper h-[90vh]">
            <div className="bg-[var(--darker-gray-2)] table-selector flex flex-row ml-0">
                <div className="w-[75%] p-8 flex flex-row gap-8">
                    {getOwnedTables()}
                    <Tilt
                        scale={1.1}
                        tiltReverse
                        className="w-1/4 h-[33vh] bg-[var(--darkest-purple)] rounded-md flex flex-col items-center justify-center p-3 transition-all cursor-pointer hover:brightness-90 card-tilt z-50 border-[1px] border-[var(--dark-purple)]">
                        <FaPlus size={96} className="text-[var(--light-mint)]" />
                    </Tilt>
                </div>
            </div>

            <div className="bg-[var(--darker-mint-2)] sidebar p-3 shadow-left">
                <div className="bg-[red] cursor-pointer" onMouseEnter={() => setShowTableLabel(true)} onMouseLeave={() => setShowTableLabel(false)}>
                    <div className={` w-[100%] flex flex-col justify-center items-center rounded-sm p-5 hover:brightness-75 font-bold text-[var(--black)] cursor-pointer transition-all ${showTableLabel && 'translate-y-[-25%] scale-75'}`}>
                        <FaDungeon size={55} color="var(--lighter-mint)" />
                        {showTableLabel &&
                            <div className="animation-[from-left]">
                                Tables
                            </div>
                        }
                    </div>
                </div>
            </div>

        </main>
    );
}
