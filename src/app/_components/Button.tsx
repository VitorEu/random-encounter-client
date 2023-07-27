import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps, ReactNode } from "react";
import { IconType } from "react-icons";
import { FaRightFromBracket } from "react-icons/fa6";

export interface ButtonProps {
    label?: string;
    icon?: ReactNode;
    onClick?: () => void;
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

const Button = ({
    label,
    icon,
    onClick,
    className,
    labelClassName,
    disabled = false,
    type = 'button'
}: ButtonProps) => {
    return (
        <button
            className={`border-[var(--mint)] border-2 p-1.5 px-3 rounded-md disabled:opacity-30 disabled:border-gray-500 ${!disabled && 'hover:bg-[var(--gray)]'} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}>
            {icon ?
                <div className="flex flex-row w-[100%] items-center">
                    <div>
                        {icon}
                    </div>
                    <span className={`text-[var(--platinum)] ml-[22%] text-sm ${labelClassName}`}>
                        {label}
                    </span>
                </div>
                :
                <span className={`text-[var(--platinum)] text-sm ${labelClassName}`}>
                    {label}
                </span>
            }
        </button>
    );
};

export { Button };
