"use client"
import { useEffect, useState } from 'react'
import Row from './row/Row'
import { useAtom } from 'jotai'
import { activeRowIndexAtom, row1Atom, row2Atom, row3Atom, row4Atom, row5Atom } from '@/state'

function Grid() {
    // const [activeRow, setActiveRow] = useAtom(useAtom(activeRowAtom))
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom);
    const [row1, setRow1] = useAtom(row1Atom)
    const [row2, setRow2] = useAtom(row2Atom)
    const [row3, setRow3] = useAtom(row3Atom)
    const [row4, setRow4] = useAtom(row4Atom)
    const [row5, setRow5] = useAtom(row5Atom)



    useEffect(() => {
        const rowList = [row1, row2, row3, row4, row5];
        const setRowList = [setRow1, setRow2, setRow3, setRow4, setRow5];
        const row = rowList[activeRowIndex];
        const setRow = setRowList[activeRowIndex];
        const handleKeyDown = (e: KeyboardEvent) => {
            const regex = new RegExp("[a-zA-Z]");
            const isLetter = regex.test(e.key) && e.key.length === 1;
            if (isLetter) {
                // console.log();
                setRow((prev) => {
                    const newPrev = [...prev];
                    newPrev.push(e.key);
                    return newPrev
                });
            }
        }
        if (activeRowIndex < 4 && row.length === 5) {
            setActiveRowIndex(prev => prev + 1);
        }

        document.addEventListener("keypress", handleKeyDown);
        return () => {
            document.removeEventListener("keypress", handleKeyDown);
        }
    }, [activeRowIndex, row1, row2, row3, row4, row5, setActiveRowIndex, setRow1, setRow2, setRow3, setRow4, setRow5])

    return (
        <>
            <Row rowData={row1} id={1} />
            <Row rowData={row2} id={2} />
            <Row rowData={row3} id={3} />
            <Row rowData={row4} id={4} />
            <Row rowData={row5} id={5} />
        </>
    )
}

export default Grid