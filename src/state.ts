import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { Atom, PrimitiveAtom } from "jotai/vanilla";

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

export const useRowAtom = (rowAtom: PrimitiveAtom<string[]>, rowIndex: number) => {
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

        if (activeRowIndex === rowIndex) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [activeRowIndex, row.length, rowIndex, setRow])
}
