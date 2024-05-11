import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { MENU_ACTIONS, MenuAction } from "@/constants/app.menuActions"

export const HubNavBar = () => {

    const [actionList, _] = useState<MenuAction[]>(MENU_ACTIONS);

    return actionList.map(({ title, redirect, icon, showLabel: showLabelRaw }) => {

        const [showLabel, setShowLabel] = useState<boolean>(showLabelRaw);

        return (
            <div className="cursor-pointer" onMouseEnter={() => setShowLabel(true)} onMouseLeave={() => setShowLabel(false)}>
                <div className={` w-[100%] flex flex-col justify-center items-center rounded-sm p-5 hover:brightness-75 font-bold text-[var(--black)] cursor-pointer transition-all ${showLabel && 'translate-y-[-5%] scale-95'}`}>
                    {icon}
                    {showLabel &&
                        <div className="animation-[from-left] text-[var(--lightest-gray)]">
                            {title}
                        </div>
                    }
                </div>
            </div>
        )
    })

}