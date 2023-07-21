import { JSX, useEffect, useState } from "react";
import { v4 } from "uuid";
import { InputText } from "./InputText";
import { FaMagnifyingGlass } from 'react-icons/fa6'

interface SelectItem {
    id: string,
    value: string
}

export interface SelectMenuProps {
    title: string;
    onChange?: (value: any) => void;
    onSelect: (value: any) => void;
    items: SelectItem[];
    value: any;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    search?: boolean;
}

const SelectMenu = ({
    title,
    value,
    onChange,
    onSelect,
    items,
    placeholder,
    disabled = false,
    required = false,
    search = false,
}: SelectMenuProps) => {
    const [itemSelect, setItemSelect] = useState<any>(value);
    const [renderPh, setRenderPh] = useState<boolean>(true);
    const [workList, setWorkList] = useState<SelectItem[]>(items);
    const [searchParam, setSearchParam] = useState<string>();

    const [renderDropdown, setRenderDropdown] = useState<boolean>(false);

    const selectItems = () => {
        let propList: JSX.Element[] = [];
        if (!workList.length) setWorkList(items)
        workList.forEach((item: SelectItem) => {
            propList.push(
                <button type="button"
                    className="hover:bg-[var(--pumpkin-dark-2)] p-2 cursor-pointer text-left text-[var(--platinum)] rounded-lg ml-7"
                    onClick={async (data) => {
                        setItemSelect(item.value)
                        onSelect(item.id)
                        setRenderDropdown(false)
                    }}
                    key={item.id}>
                    {item.value}
                </button>)
        })

        return propList;
    }

    const filterItems = (value: string) => {
        const filteredList: SelectItem[] = items.filter(item => {
            return item.value.toLowerCase().includes(value.toLowerCase());
        });

        setWorkList(filteredList);
    }

    return (
        <div className="flex flex-col"
            onMouseLeave={() => setRenderDropdown(false)}>
            <label htmlFor={title} className="text-[var(--platinum)] ml-1">
                <span>
                    {title}
                    {required &&
                        <span className="text-[var(--pumpkin)]"> *</span>}
                </span>
            </label>
            <input
                className={`static h-8 p-1 bg-black bg-opacity-0 outline-none border-b-2 rounded-s transition text-[var(--platinum)] focus:border-[var(--pumpkin)] focus:bg-opacity-10`}
                id={title}
                required={required}
                value={itemSelect}
                disabled={disabled}
                onFocus={() => setRenderDropdown(true)}
                onChange={({ target }) => {
                    setItemSelect(target.value)
                    onChange && onChange(target.value);
                }}
                readOnly
            />
            {renderDropdown &&
                <div
                    className={`absolute z-50 bg-[var(--eerie-black)] p-3 flex flex-col justify-start w-[84.2%] h-[${workList.length * 8}px] max-h-[20rem] overflow-y-scroll no-scrollbar rounded-b-xl translate-y-[3.5rem]`}>

                    {search &&
                        <InputText
                            value={searchParam}
                            icon={<FaMagnifyingGlass />}
                            wClass="w-[100%]"
                            placeholder="..."
                            onChange={(value) => {
                                filterItems(value)
                            }}
                        />
                    }
                    {selectItems()}
                </div>
            }
        </div>
    );
};

export { SelectMenu };
