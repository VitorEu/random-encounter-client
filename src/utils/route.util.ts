import { APP_ROUTES } from "@/constants/app.routes";

/**
 * 
 * @param asPath string
 * @returns boolean
 */
export const isPublicRoute = (asPath: string): boolean => {
    const appPublicRoutes = Object.values(APP_ROUTES.public).map(r => r.path);

    return appPublicRoutes.includes(asPath);
}

/**
 * 
 * @param asPath string
 * @returns boolean
 */
export const isRestrictRoute = (asPath: string): boolean => {
    const appRestrictedRoutes = Object.values(APP_ROUTES.public).filter(r => r.restrict).map(r => r.path);

    return appRestrictedRoutes.includes(asPath);
}