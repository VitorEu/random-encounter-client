'use client'
import { v4 as uuid } from "uuid";
import { Component, HTMLInputTypeAttribute, ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaCaretDown, FaEye, FaEyeSlash } from "react-icons/fa6";

export interface InputTextProps {
    title?: string;
    placeholder?: string;
    value: string | undefined;
    icon?: JSX.Element;
    onChange: (value: string) => void;
    onBlur?: () => void;
    wClass?: string;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
    showEye?: boolean;
}

function InputText({
    title,
    value,
    icon,
    onChange,
    type = 'text',
    onBlur,
    placeholder,
    wClass = "w-72",
    required = false,
    showEye = false,
}: InputTextProps): JSX.Element {

    const [textValue, setTextValue] = useState(value);
    const [stateType, setStateType] = useState(type);

    return (
        <div className="flex flex-col" id="input-container">
            <label htmlFor={title} className={`text-[var(--platinum)] ml-1 select-none`}>
                <span className="">
                    {title}
                    {required && title &&
                        <span className="text-[orange]"> *</span>}
                </span>
            </label>
            <div className="flex flex-row">
                {icon &&
                    <span className="text-xl self-start align-middle text-[var(--platinum)] p-2">
                        {icon}
                    </span>
                }
                <input
                    className={`h-8 ${wClass} p-1 bg-black bg-opacity-0 outline-none border-b-2 rounded-s transition text-[var(--platinum)] focus:border-[var(--mint)] focus:bg-opacity-10`}
                    id={title}
                    type={stateType}
                    required={required}
                    value={textValue || ''}
                    onBlur={() => onBlur && onBlur()}
                    onChange={({ target }) => {
                        setTextValue(target.value);
                        onChange(target.value);
                    }}
                />
                {showEye ?
                    <div>
                        {stateType === 'password' ?
                            <FaEye
                                id={uuid()}
                                color="var(--platinum)"
                                className="cursor-pointer absolute items-end right-12 mt-1 select-none"
                                size={21}
                                onClick={() => setStateType('text')}
                            />
                            :
                            <FaEyeSlash
                                id={uuid()}
                                color="var(--platinum)"
                                className="cursor-pointer absolute items-end right-12 mt-[2.2px] select-none mr-[-0.5px]"
                                size={23}
                                onClick={() => setStateType('password')}
                            />
                        }
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    );
};

export { InputText };
