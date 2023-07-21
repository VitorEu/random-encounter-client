'use client'
import { v4 } from "uuid";
import { HTMLInputTypeAttribute, useState } from "react";

export interface InputTextProps {
    title?: string;
    placeholder?: string;
    value: string | undefined;
    icon?: React.ElementType<any> | undefined;
    onChange: (value: string) => void;
    onBlur?: () => void;
    wClass?: string;
    type?: HTMLInputTypeAttribute;
}

const InputText = ({
    title,
    value,
    icon,
    onChange,
    type = 'text',
    onBlur,
    placeholder,
    wClass = "w-72",
}: InputTextProps) => {
    const Icon: any = icon;
    const uuid = v4();

    const [textValue, setTextValue] = useState(value);

    return (
        <div className="flex flex-col" id="input-container">
            <label htmlFor={title} className="text-[var(--platinum)] ml-1">
                {title}
            </label>
            <input
                placeholder={placeholder}
                className={`h-8 ${wClass} p-1 bg-black bg-opacity-0 outline-none border-b-2 rounded-s transition text-[var(--platinum)] focus:border-[var(--pumpkin)] focus:bg-opacity-10`}
                id={title}
                type={type}
                value={textValue}
                onBlur={() => onBlur && onBlur()}
                onChange={({ target }) => {
                    setTextValue(target.value);
                    onChange(target.value);
                }}
            />
        </div>
    );
};

export { InputText };
