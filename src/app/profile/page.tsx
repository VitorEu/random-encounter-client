'use client'
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";

export default function Page() {

    const { isAuthenticated } = useContext(AuthContext)

    const Router = useRouter();

    useEffect(() => { if (!isAuthenticated) Router.push("/") }, []);

    return (
        <main className="bg-bottom p-[2.80rem] flex flex-row justify-center">
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white">202</h1>
                <h2 className="text-2xl font-bold text-white">Work In Progress</h2>
                <p className="text-white">The page you are looking for are in construction.</p>
            </div>
        </main>
    );
}
