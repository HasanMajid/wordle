import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { Atom, PrimitiveAtom } from "jotai/vanilla";
import { checkWord } from "./utils/helpers";

export const themeAtom = atom<"dark" | "light">("dark");
export const winStateAtom = atom<boolean>(false);
export const activeRowIndexAtom = atom(0);
export const maxRowLength = 5;

export const rows = [
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
];

export const rowColoursAtoms = [
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
];

export const getActiveRowAtom = atom<Atom<string[]>>((get) => {
    const rowIndex = get(activeRowIndexAtom);
    return rows[rowIndex];
});

export const isCheckingAtom = atom<boolean>(false);

export const useRowAtom = (rowAtom: PrimitiveAtom<string[]>, rowIndex: number) => {
    const [isChecking, setIsChecking] = useAtom(isCheckingAtom);
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom)
    const [row, setRow] = useAtom(rowAtom);
    const [winState, setWinState] = useAtom(winStateAtom);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Backspace") {
                setRow((prev: string[]) => {
                    const newPrev = [...prev];
                    newPrev.pop();
                    return newPrev;
                });
            } else {
                const regex = new RegExp("[a-zA-Z]");
                const isLetter = regex.test(e.key) && e.key.length === 1;
                if (isLetter && row.length < maxRowLength) {
                    setRow((prev: string[]) => {
                        const newPrev = [...prev];
                        newPrev.push(e.key.toUpperCase());
                        return newPrev;
                    });
                }
            }
        }

        if (activeRowIndex === rowIndex && isChecking === false && winState === false) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [activeRowIndex, isChecking, row.length, rowIndex, setRow, winState])
}

export const useGridAtom = () => {
    const [isChecking, setIsChecking] = useAtom(isCheckingAtom);
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom);
    const [activeRowAtom] = useAtom(getActiveRowAtom);
    const [row, setRow] = useAtom(activeRowAtom);
    const rowColoursAtom = rowColoursAtoms[activeRowIndex];
    const [rowColours, setRowColours] = useAtom(rowColoursAtom);
    const [winState, setWinState] = useAtom(winStateAtom)
    
    useEffect(() => {
        const handleEnterDown = async (e: KeyboardEvent) => {
            let word = ""
            row.map(letter => {
                word += letter;
            })

            if (e.key === "Enter") {
                setIsChecking(true);
                const correctness = await checkWord(word);
                if (correctness !== null) {
                    setRowColours(correctness);
                    if (correctness.every((value) => value === "green")) {
                        console.log('setting win state');
                        setWinState(true);
                    }
                    if (activeRowIndex !== 5 && row.length === maxRowLength) {
                        setActiveRowIndex(prev => prev + 1)
                    }
                }
                setIsChecking(false)
                console.log('clicked Enter');
            }
        }

        if (row.length === maxRowLength && isChecking === false && winState === false) {
            document.addEventListener("keydown", handleEnterDown);
        }

        return () => {
            document.removeEventListener("keydown", handleEnterDown);
        }
    }, [activeRowIndex, isChecking, row, winState, setActiveRowIndex, setIsChecking, setRowColours, setWinState])

    return { isChecking }
}

export const useTheme = () => {
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
}

export const useTime = () => {
    const [loadingTime, setLoadingTime] = useState(true);
    const [hours, setHours] = useState(24);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        const counter = setInterval(() => {
            setLoadingTime(true);
            const date = new Date()
            const currentHour = date.getUTCHours();
            const currentMinute = date.getUTCMinutes();
            setMinutes(60 - currentMinute);
            setHours(() => 24 - currentHour);
            if (currentMinute !== 0) {
                setHours(prev => prev - 1)
            }
            console.log(currentHour);
            setLoadingTime(false);
        }, 1000)

        return () => {
            clearInterval(counter);
        }
    }, [])

    return {hours, minutes, loadingTime}
}
