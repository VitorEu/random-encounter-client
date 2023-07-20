"use client";
import { useEffect, useState } from "react";
import { InputText } from "../_components/InputText";
import { User } from "@/model/user/user.type";
import { Button } from "../_components/Button";
import { SelectMenu } from "../_components/SelectMenu";
import { CountryDTO } from "../_api/dtos/address.dto";
import addressRequest from "../_api/address.request";


export default function Page() {

    const [newUser, setNewUser] = useState<User>({} as User);
    const [countryList, setCountryList] = useState<any[]>([]);
    const [stateList, setStateList] = useState<any[]>([]);

    const [enableStateSelection, setEnableStateSelection] = useState<boolean>(false);

    useEffect(() => {
        getCountry()
    }, [])

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

    return (
        <main className="p-[2.80rem] bg-lich ">
            <div className="flex flex-row justify-start ml-16 mr-16">
                <div className="flex flex-col justify-between items-start w-1/3 h-[80vh] p-10 glass">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col justify-between items-start">
                            <div className="flex flex-row gap-10">
                                <InputText
                                    value={newUser.firstName}
                                    title="First Name"
                                    wClass="w-[100%]"
                                    onChange={(value: string) => {
                                        newUser.firstName = value;
                                        setNewUser(newUser);
                                    }}
                                />
                                <InputText
                                    value={newUser.lastName}
                                    title="Last Name"
                                    wClass="w-[100%]"
                                    onChange={(value: string) => {
                                        newUser.lastName = value;
                                        setNewUser(newUser);
                                    }}
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
                            }}
                        />
                        <SelectMenu
                            items={countryList}
                            placeholder="Country"
                            value={newUser.country}
                            title="Country"
                            onChange={(value: string) => {
                                newUser.country = value;
                                setNewUser(newUser);
                                getState(value);
                                setEnableStateSelection(true);
                            }}
                        />
                        <SelectMenu
                            items={stateList}
                            placeholder="State/Province"
                            disabled={!enableStateSelection}
                            value={newUser.state}
                            title="State or Province"
                            onChange={(value: string) => {
                                newUser.state = value;
                                setNewUser(newUser);
                            }}
                        />
                    </div>
                    <Button
                        label="Submit"
                        className="w-[100%] justify-end"
                        onClick={() => console.log(newUser)} />
                </div>
            </div>
        </main>
    );
}
