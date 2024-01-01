import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { Atom, PrimitiveAtom } from "jotai/vanilla";
import { checkWord } from "./utils/helpers";

export const themeAtom = atom<"dark" | "light">("dark");

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

        if (activeRowIndex === rowIndex && isChecking === false) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [activeRowIndex, isChecking, row.length, rowIndex, setRow])
}

export const useGridAtom = () => {
    const [isChecking, setIsChecking] = useAtom(isCheckingAtom);
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom);
    const [activeRowAtom] = useAtom(getActiveRowAtom);
    const [row, setRow] = useAtom(activeRowAtom);
    const rowColoursAtom = rowColoursAtoms[activeRowIndex];
    const [rowColours, setRowColours] = useAtom(rowColoursAtom);

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
                    if (activeRowIndex !== 5 && row.length === maxRowLength) {
                        setActiveRowIndex(prev => prev + 1)
                    }
                }
                setIsChecking(false)
                console.log('clicked Enter');
            }
        }

        if (row.length === maxRowLength && isChecking === false) {
            // TODO: check if word is right and display win state
            document.addEventListener("keydown", handleEnterDown);
        }

        return () => {
            document.removeEventListener("keydown", handleEnterDown);
        }
    }, [activeRowIndex, isChecking, row, setActiveRowIndex, setIsChecking, setRowColours])

    return { isChecking }
}
