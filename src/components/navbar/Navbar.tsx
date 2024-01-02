import { useAtom } from "jotai"
import { themeAtom } from "@/state"
import { MouseEvent, useEffect } from "react";

function Navbar() {
    const [theme, setTheme] = useAtom(themeAtom);

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme === "dark" || localTheme === "light") {
            setTheme(localTheme);
        } else {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    }, [setTheme]);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        if (theme === "light") {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    }

    return (
        <nav className="navbar container" style={{ display: "flex" }}>
            <ul style={{ flex: 1.5 }}>
                <li>
                    <button role="button" onClick={(e) => { handleToggle(e) }}>
                        Toggle Theme
                    </button>
                </li>
            </ul>
            <ul style={{ flex: 1 }}>
                <li><strong style={{ fontSize: "2rem" }}>Wordle</strong></li>
            </ul>
            <ul style={{ flex: 1 }}>
                <li></li>
            </ul>
        </nav>
    )
}

export default Navbar