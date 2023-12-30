import { useAtom } from "jotai"
import { themeAtom } from "@/state"

function Navbar() {
    const [theme, setTheme] = useAtom(themeAtom);
    const handleToggle = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    return (
        <nav className="navbar container" style={{ display: "flex" }}>
            <ul style={{ flex: 1.5 }}>
                <li><button role='button' onClick={handleToggle}>
                    Toggle Theme
                </button></li>
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