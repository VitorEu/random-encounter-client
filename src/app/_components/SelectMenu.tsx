import { JSX, useEffect, useState } from "react";
import { v4 } from "uuid";
import { InputText } from "./InputText";
import { FaCaretDown, FaMagnifyingGlass, FaSquareCaretDown } from 'react-icons/fa6'

export interface SelectItem {
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

    // useEffect(() => {
    //     selectItems();
    // }, [items, itemSelect])

    const filterItems = (value: string) => {
        const filteredList: SelectItem[] = items.filter(item => {
            return item.value.toLowerCase().includes(value.toLowerCase());
        });

        setWorkList(filteredList);
    }

    const selectItems = () => {
        let propList: JSX.Element[] = [];
        if (!workList.length) setWorkList(items)
        workList.forEach((item: SelectItem) => {
            propList.push(
                <button type="button"
                    className="hover:bg-[var(--gray)] p-2 cursor-pointer text-left text-[var(--platinum)] rounded-lg ml-7"
                    onClick={async (data) => {
                        setItemSelect(item.value);
                        setRenderDropdown(false);
                        onSelect(item.id);
                        setWorkList(items);
                    }}
                    key={item.id}>
                    {item.value}
                </button>
            )
        })

        return propList;
    }

    return (
        <div className={`flex flex-col ${disabled && 'opacity-50'}`}
            onMouseLeave={() => setRenderDropdown(false)}>
            <label htmlFor={title} className="text-[var(--platinum)] ml-1">
                <span>
                    {title}
                    {required &&
                        <span className="text-[var(--mint)]"> *</span>}
                </span>
            </label>
            <div className="flex flex-row justify-items-start">
                <input
                    className={`static h-8 p-1 bg-black bg-opacity-0 outline-none border-b-2 rounded-s transition text-[var(--platinum)] focus:border-[var(--mint)] focus:bg-opacity-10 w-[100%]`}
                    id={title}
                    required={required}
                    value={itemSelect}
                    disabled={disabled}
                    onFocus={() => setRenderDropdown(true)}
                    onChange={({ target }) => {
                        onChange && onChange(target.value);
                        setItemSelect(target.value)
                    }}
                    readOnly
                />
                <FaCaretDown
                    className="absolute items-end right-12 mt-2"
                    color="var(--platinum)" />
            </div>
            {renderDropdown &&
                <div
                    className={`absolute z-50 bg-[var(--black)] p-3 flex flex-col justify-start w-[84.2%] h-[${workList.length * 8}px] max-h-[20rem] overflow-y-scroll no-scrollbar rounded-b-xl translate-y-[3.5rem]`}>

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