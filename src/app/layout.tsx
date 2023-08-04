"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "../contexts/AuthContext";
import { HeaderNavigator } from "@/components/HeaderNavigator";
import { usePathname } from "next/navigation";
import { isPublicRoute, isRestrictRoute } from "@/utils/route.util";
import { TableProvider } from "@/contexts/TableContext";

const font = Roboto({
	subsets: ["latin"],
	weight: "400",
});

const metadata: Metadata = {
	title: "Random Encounter",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	const pathName = usePathname();

	const isPublic = isPublicRoute(pathName);

	return (
		<html lang="en">
			<title>Random Encounter</title>
			<body className={font.className}>
				<ToastContainer limit={2} />
				{!isPublic &&
					<AuthProvider>
						<TableProvider>
							<HeaderNavigator />
							{children}
						</TableProvider>
					</AuthProvider>
				}
				{isPublic &&
					<>
						<HeaderNavigator />
						{children}
					</>
				}
			</body>
		</html>
	);
}
