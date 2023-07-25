"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Button } from "./_components/Button";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "./contexts/AuthContext";
import { HeaderNavigator } from "./_components/HeaderNavigator";

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
	return (
		<html lang="en">
			<body className={font.className}>
				<AuthProvider>
					<HeaderNavigator />
					{children}
					<ToastContainer limit={2} />
				</AuthProvider>
			</body>
		</html>
	);
}
