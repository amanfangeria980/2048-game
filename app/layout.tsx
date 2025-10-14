import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "@/components/background-music/BackgroundMusic";

const archivoBlack = Archivo_Black({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-head",
    display: "swap",
});

const space = Space_Grotesk({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "2048 Game - Aman Fangeria",
    description: "Created by Aman Fangeria",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${archivoBlack.variable} ${space.variable}`}>
                <BackgroundMusic />
                {children}
            </body>
        </html>
    );
}
