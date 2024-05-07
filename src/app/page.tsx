"use client"

import { AUTH_TOKEN } from "@/constants/app.auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	
	const Router = useRouter();
	useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem(AUTH_TOKEN)) {
                Router.push('/hub');
                return;
            }
        }

    }, [])
	

	return <main></main>;
}
