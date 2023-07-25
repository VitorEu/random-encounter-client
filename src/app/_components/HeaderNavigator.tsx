import Link from "next/link"
import { Button } from "./Button"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"


export const HeaderNavigator = () => {

    const { userData, isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="navbar py-5 px-12 flex flex-row justify-between items-center">
            <div className="w-1">
                <Link href="/" className="title bold leading-6">
                    Random Encounter
                </Link>
            </div>
            {isAuthenticated ?
                <div>

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