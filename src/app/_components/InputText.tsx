'use client'
import { v4 } from "uuid";
import { Component, HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { IconType } from "react-icons";

export interface InputTextProps {
    title?: string;
    placeholder?: string;
    value: string | undefined;
    icon: JSX.Element;
    onChange: (value: string) => void;
    onBlur?: () => void;
    wClass?: string;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
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
}: InputTextProps): JSX.Element {
    const uuid = v4();

    const [textValue, setTextValue] = useState(value);

    return (
        <div className="flex flex-col" id="input-container">
            <label htmlFor={title} className="text-[var(--platinum)] ml-1">
                <span>
                    {title}
                    {required &&
                        <span className="text-[var(--pumpkin)]"> *</span>}
                </span>
            </label>
            <div className="flex flex-row">
                {icon &&
                    <span className="text-xl self-start align-middle text-[var(--platinum)] p-2">
                        {icon}
                    </span>
                }
                <input
                    placeholder={placeholder}
                    className={`h-8 ${wClass} p-1 bg-black bg-opacity-0 outline-none border-b-2 rounded-s transition text-[var(--platinum)] focus:border-[var(--pumpkin)] focus:bg-opacity-10`}
                    id={title}
                    type={type}
                    required={required}
                    value={textValue}
                    onBlur={() => onBlur && onBlur()}
                    onChange={({ target }) => {
                        setTextValue(target.value);
                        onChange(target.value);
                    }}
                />
            </div>
        </div>
    );
};

export { InputText };
