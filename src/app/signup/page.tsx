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

    const [newUser, setNewUser] = useState<User>({} as User);
    const [countryList, setCountryList] = useState<SelectItem[]>([]);
    const [stateList, setStateList] = useState<SelectItem[]>([]);
    const [cityList, setCityList] = useState<SelectItem[]>([]);

    const [renderPassMismatch, setRenderPassMismatch] = useState<boolean>(false)
    const [renderWeakPass, setRenderWeakPass] = useState<boolean | undefined>(false)
    const [duplicateEmail, setDuplicateEmail] = useState<boolean | undefined>(false)
    const [confirmPass, setConfirmPass] = useState<string | undefined>()
    const [captchaVerified, setCaptchaVerified] = useState<boolean>(false)
    const [enableStateSelection, setEnableStateSelection] = useState<boolean>(false);
    const [enableCitySelection, setEnableCitySelection] = useState<boolean>(false);

    useEffect(() => {
        getCountry()
    }, [])

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();
        if (!renderPassMismatch && !renderWeakPass) {
            const userBody = {
                user: {
                    name: `${newUser.firstName} ${newUser.lastName}`,
                    email: newUser.email,
                    role: 'USER',
                    password: newUser.password
                },
                address: {
                    description: 'Teste',
                    cityId: newUser.city,
                    provinceId: newUser.state,
                    countryId: newUser.country
                }
            }

            try {
                var response = await authRequest.registerUser(userBody);
            } catch (ex: AxiosError | any) {
                setDuplicateEmail(ex?.response.status == 409);
            }
        }
    }

    const passMatch = (confirmPass: string) => {
        if (confirmPass) {
            setRenderPassMismatch(confirmPass !== newUser.password);
        }
    }

    const passStrongness = (pass: string) => {
        if (pass) {
            setRenderWeakPass(!RegExUtil.password.test(pass));
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
        <main className="bg-lich p-[2.80rem] flex flex-row">
            <div className="flex flex-row justify-end mr-16">
                <div className="bg-giant-flipped bg-[-550px] w-[50vw] flex flex-row justify-start ">
                    <div className="flex flex-col justify-between items-start w-[31.5rem] h-[80vh] p-10 glass scale-x-[-1] ">
                        <form
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
                                        wClass="w-[100%]"
                                        onChange={(value: string) => {
                                            passStrongness(value)
                                            passMatch(value);
                                            newUser.password = value;
                                            setNewUser(newUser);
                                        }}
                                        required
                                    />

                                    <InputText
                                        value={confirmPass}
                                        title="Confirm Password"
                                        type="password"
                                        wClass="w-[100%]"
                                        onChange={(value: string) => {
                                            setConfirmPass(value);
                                            passMatch(value);
                                        }}
                                        required
                                    />
                                </div>
                                <Button
                                    label="Submit"
                                    type="submit"
                                    disabled={renderPassMismatch || renderWeakPass}
                                    labelClassName="!text-[var(--eerie-black)]"
                                    className="w-[100%] justify-end bg-[var(--pumpkin)] hover:bg-[var(--pumpkin-dark)] mt-4" />

                                <div className="text-[var(--pumpkin)] text-sm flex flex-col gap-2">
                                    {renderPassMismatch &&
                                        <Alert severity="error"> Password does not match </Alert>
                                    }
                                    {renderWeakPass &&
                                        <Alert severity="warning">- Password must have: atleast 8 characters long, lower and upper case letters, a number, and a special symbol [_#?!@$%^&*-].</Alert>
                                    }
                                    {duplicateEmail &&
                                        <Alert severity="error"> Email already in use </Alert>
                                    }
                                </div>
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
