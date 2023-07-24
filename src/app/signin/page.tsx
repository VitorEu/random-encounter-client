"use client";
import React, { FormEvent, useEffect, useReducer, useState } from "react";
import { InputText } from "../_components/InputText";
import { User } from "@/model/user/user.type";
import { Button } from "../_components/Button";
import { SelectItem, SelectMenu } from "../_components/SelectMenu";
import addressRequest from "../_api/address.request";
import capitalize from 'capitalize';
import ReCAPTCHA from "react-google-recaptcha";
import { RegExUtil } from "../_utils/regex.util";
import authRequest from "../_api/auth.request";
import { Alert } from "@mui/material";
import { AxiosError } from "axios";
import Link from "next/link";


export default function Page() {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [captchaVerified, setCaptchaVerified] = useState<boolean>(false)

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

    }

    return (
        <main className="bg-giant-dark bg-bottom p-[2.80rem] flex flex-row">
            <div className="flexflex-row justify-end mr-16">
                <div className="bg-tiamat-flipped bg-[-250px] w-[50vw] flex flex-row justify-start ">
                    <div className="flex flex-col justify-center items-center w-[27vw] h-[80vh] p-10 glass flip">
                        <form
                            className="flex flex-col gap-[2rem] w-[100%]"
                            onSubmit={(event) => {
                                submitForm(event)
                            }}>
                            <InputText
                                value={email}
                                placeholder="E-mail"
                                wClass="w-[100%]"
                                onChange={(value: string) => {
                                    setEmail(value);
                                }}
                                required
                            />
                            <InputText
                                value={password}
                                placeholder="Password"
                                wClass="w-[100%]"
                                onChange={(value: string) => {
                                    setPassword(value);
                                }}
                                required
                            />
                            <div className="flex flex-row justify-end">
                                <Link href={"/signin"} className="text-[var(--light-purple-2)] hover:font-bold"> Forgot your password? </Link>
                            </div>
                            <Button
                                label="Sign in"
                                type="submit"
                                labelClassName="!text-[var(--eerie-black)]"
                                className="w-[100%] justify-end bg-[var(--pumpkin-dark)] hover:bg-[var(--pumpkin)]" />
                        </form>
                    </div>
                </div>
            </div>
            <ReCAPTCHA
                sitekey="6Lf6uEEnAAAAAAMfmsNLDVasUXmwpFFEMepRxbBi"
                size="invisible"
                onChange={() => setCaptchaVerified(true)}
                onExpired={() => setCaptchaVerified(false)}
                onError={() => setCaptchaVerified(false)}
                className="self-center"
                theme="dark"
            />
        </main>
    );
}
