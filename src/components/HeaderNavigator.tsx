import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { Avatar } from "@mui/material"
import { FaDiceD20, FaRightFromBracket, FaUser } from "react-icons/fa6"

import { Button } from "./Button"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export const HeaderNavigator = () => {

    const { completeUserData: user, isAuthenticated, signOut } = useContext(AuthContext);

    const [openUserOptions, setOpenUserOptions] = useState<boolean>(false);

    const Router = useRouter();

    return (
        <nav className="bg-[var(--black)] border-b-[var(--mint)] border-b-2 py-5 px-12 flex flex-row justify-between items-center h-[10vh] w-[100vw]">
            <div className="w-1">
                <Link href={isAuthenticated ? '/hub' : '/'} className="title bold leading-6">
                    <FaDiceD20 size={42} />
                </Link>
            </div>
            {isAuthenticated && user ?
                <div onMouseLeave={() => setOpenUserOptions(false)} tabIndex={20}>
                    <div className="cursor-pointer hover:brightness-125 transition"
                        onClick={() => setOpenUserOptions(!openUserOptions)}>
                        <Avatar
                            sx={{ bgcolor: user.colorHex }}>
                            {user.name && user.name[0]}
                        </Avatar>
                    </div>
                    {openUserOptions &&
                        <div className=" w-[12rem] bg-[var(--darkest-gray)] absolute -translate-x-3/4 p-4 rounded-lg flex flex-col gap-4 bold z-50">
                            <div className="w-[100%]">
                                <Button
                                    className="w-[100%] border-transparent backdrop-brightness-90"
                                    icon={<FaUser color="white" />}
                                    label="Profile"
                                    onClick={() => Router.push("/profile")}
                                />
                            </div>
                            <div className="w-[100%]">
                                <Button
                                    className="w-[100%] !border-[orangered]"
                                    icon={<FaRightFromBracket color="white" />}
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