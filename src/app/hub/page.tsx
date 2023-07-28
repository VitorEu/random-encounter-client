'use client'
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { getAPIClient } from "../_api/base.apiClient";
import { useRouter } from "next/navigation";
import { success } from "../_utils/toast";
import { AuthContext } from "../contexts/AuthContext";

export default function Page() {

    const { isAuthenticated } = useContext(AuthContext)

    const Router = useRouter();
    useEffect(() => {
        const { 're.token': token } = parseCookies()
        if (!isAuthenticated) {
            Router.push("/")
        }
    }, []);

    return (
        <main className="bg-giant-dark bg-bottom p-[2.80rem] flex flex-row">
            hub
        </main>
    );
}
