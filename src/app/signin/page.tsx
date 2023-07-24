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


export default function Page() {

    const [captchaVerified, setCaptchaVerified] = useState<boolean>(false)

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

    }

    return (
        <main className="bg-giant p-[2.80rem] flex flex-row">
            <div className="flex flex-row justify-end mr-16">
                <div className="bg-tasha-flipped bg-c1 w-[50vw] flex flex-row justify-start ">
                    <div className="flex flex-col justify-between items-start w-[31.5rem] h-[80vh] p-10 glass scale-x-[-1] ">
                        <form
                            className="flex flex-col"
                            onSubmit={(event) => {
                                submitForm(event)
                            }}>
                            <div className="flex flex-col gap-[1rem]">


                                <Button
                                    label="Submit"
                                    type="submit"
                                    labelClassName="!text-[var(--eerie-black)]"
                                    className="w-[100%] justify-end bg-[var(--pumpkin)] hover:bg-[var(--pumpkin-dark)] mt-4" />
                            </div>
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
