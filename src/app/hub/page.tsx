import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { FormEvent, useState } from "react";
import { getAPIClient } from "../_api/base.apiClient";

export default function Page() {

    return (
        <main className="bg-giant-dark bg-bottom p-[2.80rem] flex flex-row">
            hub
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { 're.token': token } = parseCookies(ctx);

    await apiClient.get('/address/city');

    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
