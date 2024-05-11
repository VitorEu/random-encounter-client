import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FaArrowRight, FaX } from "react-icons/fa6";

interface BaseModalProps {
    title: string;
    isOpened: boolean;
    onClose?(): void;
    onCancel?(): void;
    children: any;
    closeAction: Dispatch<SetStateAction<boolean>>;
}

export const BaseModal = ({ title, children, isOpened, onClose, onCancel, closeAction }: BaseModalProps) => {

    const onCloseHandle = () => {
        closeAction(false);

        if (onClose)
            onClose();
    }

    return isOpened && (
        <div className="absolute w-full h-full backdrop-brightness-75 bg-black bg-opacity-30 z-10">
            <dialog className="relative w-[660px] h-[85%] top-[7.5%] rounded-xl bg-[var(--platinum)] z-50 overflow-auto backdrop-blur flex flex-col justify-start items-center">
                
                <header className="relative h-[90px] min-h-[90px] w-full px-8 flex flex-row justify-between items-center bg-[var(--polished-platinum)] z-10">
                    <label className="bold uppercase text-[20px]">
                        {title}
                    </label>
                    <div 
                        onClick={onCloseHandle}
                        className="w-[32px] hover:w-[46px] hover:mr-0 mr-[14px] flex flex-row justify-end cursor-pointer transition-all text-[var(--darkest-purple)] hover:text-[orangered]">
                        <FaArrowRight size={32} />
                    </div>
                </header>
                {children}
            </dialog>
        </div>
    )

}