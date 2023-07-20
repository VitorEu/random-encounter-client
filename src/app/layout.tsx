"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Button } from "./_components/Button";
import Link from "next/link";

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
							<Button
								label="Sign in"
								className="mr-6 !border-0 "
								onClick={() => console.log("teste")}
							/>
						</Link>
						<Link href="/signup">
							<Button label="Sign up" onClick={() => console.log("teste")} />
						</Link>
					</div>
				</nav>
				{children}
			</body>
		</html>
	);
}
