import { ElementType } from "react";

export interface ButtonProps {
    label?: string;
    icon?: React.ElementType<any> | undefined;
    onClick: () => void;
    className?: string;
    labelClassName?: string;
}

const Button = ({
    label,
    icon,
    onClick,
    className,
    labelClassName,
}: ButtonProps) => {
    const Icon: any = icon;

    return (
        <button className={`border-[var(--pumpkin)] border-2 p-1.5 px-3 rounded-md hover:bg-[var(--light-purple)] ${className}`}
            onClick={onClick}>
            {icon && <Icon />}
            <span className={`uppercase text-[var(--platinum)] text-sm ${labelClassName}`}>
                {label}
            </span>
        </button>
    );
};

export { Button };
