"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Button } from "./_components/Button";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

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
				<nav className="navbar py-5 px-12 flex flex-row justify-between items-center">
					<div className="w-1">
						<Link href="/" className="title bold leading-6">
							Random Encounter
						</Link>
					</div>
					<div>
						<Link href="/signin">
							<Button label="Sign in" className="uppercase mr-6 !border-0" />
						</Link>
						<Link href="/signup">
							<Button label="Sign up" className="uppercase" />
						</Link>
					</div>
				</nav>
				{children}
				<ToastContainer limit={2} />
			</body>
		</html>
	);
}
