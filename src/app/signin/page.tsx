"use client";
import React, { FormEvent, useContext, useState } from "react";
import { InputText } from "../_components/InputText";
import { Button } from "../_components/Button";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from 'next/navigation';


export default function Page() {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [isLogged, setIsLogged] = useState<boolean>(false);

    const [captchaVerified, setCaptchaVerified] = useState<boolean>(false)

    const { signIn } = useContext(AuthContext);
    const Router = useRouter();

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

        var logged = false;

        if (email && password) {
            logged = await signIn({ email, password });

            setIsLogged(logged);
            if (logged)
                Router.push("/hub")
        }
    }

    return (
        <main className="bg-forest-flipped bg-left-center p-[2.8rem] flex flex-row justify-end items-center">
            <div className="backdrop-brightness-[0.5] h-full w-full absolute left-0 right-0" />
            <div className="flex flex-row justify-start ml-16 flip">
                <div className="bg-adventurers-flipped bg-[-750px] w-[50vw] flex flex-row justify-start ">
                    <div className="flex flex-col justify-evenly items-center w-[31.5rem] h-[80vh] p-10 glass flip ">
                        <form
                            className="flex flex-col gap-[2rem] w-[100%]"
                            onSubmit={(event) => {
                                submitForm(event)
                            }}
                            action="/hub">
                            <InputText
                                value={email}
                                title="E-mail"
                                wClass="w-[100%]"
                                onChange={(value: string) => {
                                    setEmail(value);
                                }}
                                required
                            />
                            <InputText
                                value={password}
                                title="Password"
                                type="password"
                                wClass="w-[100%]"
                                onChange={(value: string) => {
                                    setPassword(value);
                                }}
                                required
                                showEye
                            />
                            <div className="flex flex-row justify-end">
                                <Link href={"/signin"} className="text-[var(--light-mint)] hover:font-bold"> Forgot your password? </Link>
                            </div>
                            <Button
                                label="Sign in"
                                type="submit"
                                className="w-[100%] justify-end bg-[var(--dark-mint)] hover:bg-[var(--mint)]" />
                        </form>

                        <div className="w-[100%] cursor-default select-none">
                            <div className="flex flex-row justify-between items-center w-[100%]">
                                <div className="bg-[var(--platinum)] h-[4px] w-[33%] rounded-[5px]" />
                                <span className="text-white">First adventure?</span>
                                <div className="bg-[var(--platinum)] h-[4px] w-[33%] rounded-[5px]" />
                            </div>

                            <Link href="/signup" >
                                <Button
                                    label="Sign up"
                                    type="button"
                                    labelClassName=""
                                    className="w-[100%] justify-end mt-4" />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            <ReCAPTCHA
                sitekey="6Lf6uEEnAAAAAAMfmsNLDVasUXmwpFFEMepRxbBi"
                size="invisible"
                onChange={() => setCaptchaVerified(true)}
                onExpired={() => setCaptchaVerified(false)}
                onError={() => setCaptchaVerified(false)}
                className="self-center hidden"
                theme="dark"
            />
        </main>
    );
}
