import { ElementType } from "react";

export interface ButtonProps {
    label?: string;
    icon?: React.ElementType<any> | undefined;
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
    const Icon: any = icon;

    return (
        <button
            className={`border-[var(--mint)] border-2 p-1.5 px-3 rounded-md disabled:opacity-30 disabled:border-gray-500 ${!disabled && 'hover:bg-[var(--gray)]'} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}>
            {icon && <Icon />}
            <span className={`text-[var(--platinum)] text-sm ${labelClassName}`}>
                {label}
            </span>
        </button>
    );
};

export { Button };
