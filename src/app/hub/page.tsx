'use client'
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { TableContext } from "@/contexts/TableContext";
import { FaDungeon, FaImage, FaPlugCirclePlus, FaPlus } from "react-icons/fa6";
import { Button } from "@/components/Button";
import Tilt from 'react-parallax-tilt';
import './grid.css'
import Image from "next/image";

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
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    scale={1.04}
                    className="w-1/4 h-[33vh] bg-[var(--platinum)] rounded-md flex flex-col items-center justify-start p-3 pb-0 transition-all cursor-pointer card-tilt">
                    {/* { table.table.imageUrl ?
                            <div className="max-h-[80%] max-w-[100%] hover:brightness-105 transition rounded-md flex flex-row justify-center items-center shadow-inset">
                                <Image
                                    src={table.table.imageUrl}
                                    width={500}
                                    priority
                                    height={500}
                                    alt="Table Banner"
                                />
                            </div>
                        :
                            <div className="h-[80%] w-[100%] bg-[var(--darkest-mint)] hover:brightness-105 transition rounded-md flex flex-row justify-center items-center shadow-inset">
                                <FaImage size={96} className="text-[var(--light-mint)]" />
                            </div>
                    } */}
                    <div className="h-[80%] w-[100%] bg-[var(--lighter-gray-4)] hover:brightness-105 transition rounded-md flex flex-row justify-center items-center shadow-inset">
                        <FaImage size={96} className="text-[var(--platinum)]" />
                    </div>
                    <div className="h-[20%] w-[100%] text-[var(--darkest-purple)] flex flex-col justify-center items-center bold uppercase tracking-[0.0125rem] card-sense select-none">
                        {table.table.title}
                    </div>
                </Tilt>
            )
        })

        return mappedOwnedTables;
    }

    return (
        <main className="wrapper h-[90vh]">
            <div className="bg-[white] table-selector flex flex-row ml-0">
                <div className="w-[75%] p-8 flex flex-row gap-8">
                    {getOwnedTables()}
                    <div className="w-1/4 h-[33vh] bg-[var(--platinum)] rounded-md flex flex-col items-center justify-center p-3 transition-all cursor-pointer hover:brightness-90 card-tilt z-50 ">
                        <FaPlus size={96} className="text-[var(--darkest-purple)]" />
                    </div>
                </div>
            </div>

            <div className="bg-[var(--dark-gray)] sidebar p-3 shadow-left">
                <div className="cursor-pointer" onMouseEnter={() => setShowTableLabel(true)} onMouseLeave={() => setShowTableLabel(false)}>
                    <div className={` w-[100%] flex flex-col justify-center items-center rounded-sm p-5 hover:brightness-75 font-bold text-[var(--black)] cursor-pointer transition-all ${showTableLabel && 'translate-y-[-5%] scale-95'}`}>
                        <FaDungeon size={55} color="var(--lighter-mint)" />
                        {showTableLabel &&
                            <div className="animation-[from-left] text-[var(--lightest-gray)]">
                                Tables
                            </div>
                        }
                    </div>
                </div>
            </div>

        </main>
    );
}
