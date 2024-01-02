import { useAtom } from "jotai"
import { themeAtom, useTheme } from "@/state"

function Navbar() {
    const [theme, setTheme] = useAtom(themeAtom);

    useTheme();

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