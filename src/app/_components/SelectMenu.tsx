import { JSX, useState } from "react";
import { v4 } from "uuid";

interface SelectItem {
    id: string,
    value: string
}

export interface InputTextProps {
    title: string;
    onChange: (value: any) => void;
    items: SelectItem[];
    value: any;
    placeholder?: string;
    disabled?: boolean;
}

const SelectMenu = ({
    title,
    value,
    onChange,
    items,
    placeholder,
    disabled = false
}: InputTextProps) => {
    const [itemSelect, setItemSelect] = useState<any>(value);
    const [renderPh, setRenderPh] = useState<boolean>(true);

    const uuid = v4();

    const selectItems = () => {
        let propList: JSX.Element[] = [];
        items.forEach(async (item: SelectItem) => {
            propList.push(<option key={item.id} value={item.id}>{item.value}</option>)
        })

        return propList;
    }

    return (
        <div className="flex flex-col">
            <label htmlFor={title} className="text-[var(--platinum)] ml-1">{title}</label>
            <select
                className="h-8 p-1 bg-black bg-opacity-0 outline-none border-b-2 rounded-s transition text-[var(--platinum)] focus:border-[var(--pumpkin)] focus:bg-opacity-10"
                id={title}
                placeholder={placeholder}
                value={itemSelect}
                disabled={disabled}
                onChange={({ target }) => {
                    setItemSelect(target.value)
                    onChange(target.value)
                    setRenderPh(false);
                }}>
                {renderPh && <option key={placeholder} value={placeholder}>{placeholder}</option>}
                {selectItems()}
            </select>
        </div>
    );
};

export { SelectMenu };
