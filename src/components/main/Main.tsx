"use client"
import { ReactNode } from "react"
import Navbar from "../navbar/Navbar"
import { useAtom } from "jotai"
import { themeAtom } from "@/state"

function Main({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useAtom(themeAtom);

    return (
            <html lang="en" data-theme={theme}>
                <body>
                    <Navbar />
                    {children}
                </body>
            </html>
    )
}

export default Main