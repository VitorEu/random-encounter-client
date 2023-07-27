import Link from "next/link"
import { Button } from "./Button"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Avatar } from "@mui/material"
import { FaRightFromBracket } from "react-icons/fa6"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const HeaderNavigator = () => {

    const { completeUserData: user, isAuthenticated, signOut } = useContext(AuthContext);

    const [openUserOptions, setOpenUserOptions] = useState<boolean>(false);

    return (
        <nav className="navbar py-5 px-12 flex flex-row justify-between items-center">
            <div className="w-1">
                <Link href="/" className="title bold leading-6">
                    Random Encounter
                </Link>
            </div>
            {isAuthenticated && user ?
                <div onMouseLeave={() => setOpenUserOptions(false)} tabIndex={0}>
                    <div className="cursor-pointer hover:brightness-125 transition"
                        onClick={() => setOpenUserOptions(!openUserOptions)}>
                        <Avatar
                            sx={{ bgcolor: user.colorHex }}>
                            {user.name[0]}
                        </Avatar>
                    </div>
                    {openUserOptions &&
                        <div className=" w-[12rem] bg-[var(--black)] absolute -translate-x-3/4 p-4 rounded-lg flex flex-col gap-4 bold">
                            <div className="w-[100%]">
                                <Button
                                    className="w-[100%] border-transparent backdrop-brightness-90"
                                    label="Profile"
                                />
                            </div>
                            <div className="w-[100%]">
                                <Button
                                    className="w-[100%] !border-[orangered]"
                                    icon={<FaRightFromBracket />}
                                    label="Logout"
                                    onClick={async () => await signOut()}
                                />
                            </div>
                        </div>
                    }
                </div>
                :
                <div>
                    <Link href="/signin">
                        <Button label="Sign in" className="uppercase mr-6 !border-0" />
                    </Link>
                    <Link href="/signup">
                        <Button label="Sign up" className="uppercase" />
                    </Link>
                </div>
            }
        </nav>
    )
}