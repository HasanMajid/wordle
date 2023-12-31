import { atom } from 'jotai'

export const themeAtom = atom('dark');

export const activeRowIndexAtom = atom(0);
export const row1Atom = atom<string[]>([])
export const row2Atom = atom<string[]>([])
export const row3Atom = atom<string[]>([])
export const row4Atom = atom<string[]>([])
export const row5Atom = atom<string[]>([])
export const row6Atom = atom<string[]>([])

export const rows = [row1Atom, row2Atom, row3Atom, row4Atom, row5Atom, row6Atom];

