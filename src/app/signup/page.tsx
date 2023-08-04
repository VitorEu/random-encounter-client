"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { InputText } from "../../components/InputText";
import { User, UserBody } from "@/model/user/user.type";
import { Button } from "../../components/Button";
import { SelectItem, SelectMenu } from "../../components/SelectMenu";
import addressRequest from "../../api/address.request";
import capitalize from 'capitalize';
import ReCAPTCHA from "react-google-recaptcha";
import { RegExUtil } from "../../utils/regex.util";
import authRequest from "../../api/auth.request";
import { Alert } from "@mui/material";
import { AxiosError } from "axios";
import { error, success, toastConfig } from "../../utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AUTH_TOKEN } from "@/constants/app.auth";


export default function Page() {

    const [newUser, setNewUser] = useState<User>({} as User);
    const [countryList, setCountryList] = useState<SelectItem[]>([]);
    const [stateList, setStateList] = useState<SelectItem[]>([]);
    const [cityList, setCityList] = useState<SelectItem[]>([]);

    const [passMismatch, setPassMismatch] = useState<boolean>(false)
    const [weakPass, setWeakPass] = useState<boolean | undefined>(false)
    const [duplicateEmail, setDuplicateEmail] = useState<boolean | undefined>(false)
    const [confirmPass, setConfirmPass] = useState<string | undefined>()
    const [captchaVerified, setCaptchaVerified] = useState<boolean>(false)
    const [enableStateSelection, setEnableStateSelection] = useState<boolean>(false);
    const [enableCitySelection, setEnableCitySelection] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem(AUTH_TOKEN)) {
                Router.push('/hub');
                return;
            }
        }

        getCountry()
    }, [])

    const Router = useRouter();

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();
        if (!passMismatch && !weakPass) {
            const userBody: UserBody = {
                user: {
                    name: `${newUser.firstName} ${newUser.lastName}`,
                    email: newUser.email,
                    role: 'USER',
                    password: newUser.password
                },
                address: {
                    description: '  ',
                    cityId: newUser.city,
                    provinceId: newUser.state,
                    countryId: newUser.country
                }
            }

            try {
                var response = await authRequest.registerUser(userBody);
                if (response?.status == 201) {
                    success("Account created successfully!")
                    Router.push("/signin")
                }
            } catch (ex: AxiosError | any) {
                switch (ex?.response.status) {
                    case 409:
                        error("Email already in use");
                        break;
                    default:
                        console.log(ex?.response.data.message[0])
                        error(ex?.response.data?.message[0]?.replace('user.', ''))
                        break;
                }
            }
        }
    }

    const validateFields = () => {
        newUser.password && passStrongness(newUser.password)
        confirmPass && passMatch(confirmPass);
    }

    const passMatch = (confirmPass: string) => {
        if (confirmPass && (confirmPass !== newUser.password)) {
            error('Password does not match')
            setPassMismatch(true);
        }
    }

    const passStrongness = (pass: string) => {
        if (pass && !RegExUtil.password.test(pass)) {
            error("Password must have: atleast 8 characters long, lower and upper case letters, a number and a special symbol [_#?!@$%^&*-].");
            setWeakPass(true)
        }
    }

    const getCountry = async (countryName?: string) => {
        const formattedCountries: any[] = (await addressRequest.getCountryList(countryName))?.map(country => {
            return { id: country.id, value: country.name }
        });
        formattedCountries.sort((a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase()))
        setCountryList(formattedCountries)
    }

    const getState = async (country: string) => {
        const formattedStates: any[] = (await addressRequest.getStateList(country))?.map(state => {
            return { id: state.id, value: state.name }
        });
        formattedStates.sort((a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase()))
        setStateList(formattedStates)
    }

    const getCity = async (state: string) => {
        const formattedCities: any[] = (await addressRequest.getCityList(undefined, state))?.map(state => {
            return { id: state.id, value: state.name }
        });
        formattedCities.sort((a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase()))
        setCityList(formattedCities)
    }

    return (
        <main className="bg-saltmarsh bg-left-bottom p-[2.80rem] flex flex-row justify-end items-center">
            <div className="backdrop-brightness-[0.5] backdrop-blur-0 h-full w-full absolute left-0 right-0" />
            <div className="flex flex-row justify-end ml-16 flip">
                <div className="bg-giant-flipped bg-[-550px] w-[50vw] flex flex-row justify-start ">
                    <div className="flex flex-col justify-evenly items-center w-[31.5rem] h-[80vh] p-10 glass flip ">
                        <form
                            autoComplete="false"
                            className="flex flex-col"
                            onSubmit={(event) => {
                                submitForm(event)
                            }}>
                            <div className="flex flex-col gap-[1rem]">
                                <div className="flex flex-col justify-between items-start">
                                    <div className="flex flex-row gap-10">
                                        <InputText
                                            value={newUser.firstName}
                                            title="First Name"
                                            wClass="w-[100%] capitalize"
                                            onChange={(value: string) => {
                                                newUser.firstName = capitalize(value);
                                                setNewUser(newUser);
                                            }}
                                            required
                                        />
                                        <InputText
                                            value={newUser.lastName}
                                            title="Last Name"
                                            wClass="w-[100%] capitalize"
                                            onChange={(value: string) => {
                                                newUser.lastName = capitalize(value);
                                                setNewUser(newUser);
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                                <InputText
                                    value={newUser.email}
                                    title="E-mail"
                                    wClass="w-[100%]"
                                    onChange={(value: string) => {
                                        newUser.email = value;
                                        setNewUser(newUser);
                                        setDuplicateEmail(false)
                                    }}
                                    required
                                />
                                <SelectMenu
                                    items={countryList}
                                    placeholder="Country"
                                    value={newUser.country}
                                    title="Country"
                                    onSelect={(value: string) => {
                                        newUser.country = value;
                                        setNewUser(newUser);
                                        getState(value);
                                        setEnableStateSelection(true);
                                    }}
                                    required
                                    search
                                />
                                <SelectMenu
                                    items={stateList}
                                    placeholder="State/Province"
                                    disabled={!enableStateSelection}
                                    value={newUser.state}
                                    title="State or Province"
                                    onSelect={(value: string) => {
                                        newUser.state = value;
                                        setNewUser(newUser);
                                        getCity(value);
                                        setEnableCitySelection(true);
                                    }}
                                    required
                                    search
                                />
                                <SelectMenu
                                    items={cityList}
                                    placeholder="City"
                                    disabled={!enableCitySelection}
                                    value={newUser.city}
                                    title="City"
                                    onSelect={(value: string) => {
                                        newUser.city = value;
                                        setNewUser(newUser);
                                    }}
                                    required
                                    search
                                />
                                <div className="flex flex-row gap-10">
                                    <InputText
                                        value={newUser.password}
                                        title="Password"
                                        type="password"
                                        showEye
                                        wClass="w-[100%]"
                                        onChange={(value: string) => {
                                            newUser.password = value;
                                            setNewUser(newUser);
                                        }}
                                        required
                                    />

                                    <InputText
                                        value={confirmPass}
                                        title="Confirm Password"
                                        type="password"
                                        showEye
                                        wClass="w-[100%]"
                                        onChange={(value: string) => {
                                            setConfirmPass(value);
                                        }}
                                        required
                                    />
                                </div>
                                <Button
                                    label="Sign up"
                                    type="submit"
                                    onClick={validateFields}
                                    className="w-[100%] justify-end bg-[var(--dark-mint)] hover:bg-[var(--mint)] mt-4" />

                                <div className="text-[var(--mint)] text-sm flex flex-col gap-2">
                                    {duplicateEmail &&
                                        <Alert severity="error">  </Alert>
                                    }
                                </div>
                            </div>
                        </form>
                        <div className="w-[100%] cursor-default select-none">
                            <div className="flex flex-row justify-between items-center w-[100%]">
                                <div className="bg-[var(--platinum)] h-[4px] w-[26%] rounded-[5px]" />
                                <span className="text-white">Already have an account?</span>
                                <div className="bg-[var(--platinum)] h-[4px] w-[26%] rounded-[5px]" />
                            </div>

                            <Link href="/signin" >
                                <Button
                                    label="Sign in"
                                    type="button"
                                    labelClassName=""
                                    className="w-[100%] justify-end mt-4" />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col justify-center mr-16 bg-[var(--black)] h-fit">
                <div className="text-[var(--platinum)] text-4xl ">
                    <span className="bold">Calling All Adventurers: </span>
                    <span>
                        Whether you're a seasoned dungeon master or a curious newcomer, Random Encounter welcomes players of all levels to join our vibrant community of RPG enthusiasts.
                    </span>
                </div>
            </div> */}
            <div className="left-0 self-end">
                <ReCAPTCHA
                    sitekey="6Lf6uEEnAAAAAAMfmsNLDVasUXmwpFFEMepRxbBi"
                    size="invisible"
                    onChange={() => setCaptchaVerified(true)}
                    onExpired={() => setCaptchaVerified(false)}
                    onError={() => setCaptchaVerified(false)}
                    className="self-center hidden"
                    theme="dark"
                />
            </div>
        </main>
    );
}
