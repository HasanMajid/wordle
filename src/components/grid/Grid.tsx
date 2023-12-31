"use client"
import { useEffect } from 'react'
import Row from './row/Row'
import { useAtom } from 'jotai'
import { rows } from '@/state'
import { activeRowIndexAtom, getActiveRowAtom } from '@/state'
import { checkWord } from '@/utils/helpers'

function Grid() {
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom);
    const [activeRowAtom] = useAtom(getActiveRowAtom);
    const [row, setRow] = useAtom(activeRowAtom);


    useEffect(() => {
        // const setRow = setRowList[activeRowIndex];
        const handleEnterPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                console.log('clicked Enter');
            }
        }

        if (row.length === 5) {
            // TODO: check if word is right
            let word = ""
            row.map(letter => {
                word += letter;
            })
            checkWord(word);
            document.addEventListener("keypress", handleEnterPress);
            console.log(word);
        }

        return () => {
            document.removeEventListener("keypress", handleEnterPress);
        }
    }, [activeRowIndex, row])


    return (
        <>
        {rows.map((rowAtom, index) => {
            return <Row rowAtom={rowAtom} rowIndex={index} key={index} />

        })}
            {/* <Row rowIndex={1} />
            <Row rowIndex={2} />
            <Row rowIndex={3} />
            <Row rowIndex={4} />
            <Row rowIndex={5} /> */}
        </>
    )
}

export default Grid