import { atom } from "jotai";
import { Atom } from "jotai/vanilla";

export const themeAtom = atom("dark");

export const activeRowIndexAtom = atom(0);

export const rows = [
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
    atom<string[]>([]),
];

// export const getRowAtomByID
export const getActiveRowAtom = atom<Atom<string[]>>((get) => {
    const rowIndex = get(activeRowIndexAtom);
    return rows[rowIndex];
});
