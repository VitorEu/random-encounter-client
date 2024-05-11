import { APP_ROUTES } from "./app.routes";
import { FaDungeon, FaGear } from "react-icons/fa6";

export interface MenuAction {
    title: string;
    redirect: string;
    icon: JSX.Element;
    showLabel: boolean;
}

export const MENU_ACTIONS: MenuAction[] = [

    {
        title: "Tables",
        redirect: APP_ROUTES.private.hub.path,
        icon: <FaDungeon size={55} color="var(--polished-platinum)" />,
        showLabel: false
    },
    {
        title: "Settings",
        redirect: APP_ROUTES.private.hub.path,
        icon: <FaGear size={55} color="var(--polished-platinum)" />,
        showLabel: false
    },

]