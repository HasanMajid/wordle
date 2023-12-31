"use client"
import { useEffect } from 'react'
import Row from './row/Row'
import { useAtom } from 'jotai'
import { maxRowLength, rows, rowColoursAtoms } from '@/state'
import { activeRowIndexAtom, getActiveRowAtom } from '@/state'
import { checkWord } from '@/utils/helpers'

function Grid() {
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom);
    const [activeRowAtom] = useAtom(getActiveRowAtom);
    const [row, setRow] = useAtom(activeRowAtom);
    const rowColoursAtom = rowColoursAtoms[activeRowIndex];
    const [rowColours, setRowColours] = useAtom(rowColoursAtom);

    useEffect(() => {
        // const setRow = setRowList[activeRowIndex];
        const handleEnterPress = async (e: KeyboardEvent) => {
            let word = ""
            row.map(letter => {
                word += letter;
            })

            if (e.key === "Enter") {
                await fetch("/api/check/" + word)
                    .then(response => {
                        response.json().then(data => {
                            setRowColours(data.correctness);
                        }).catch(err => {
                            console.log('error fetching');
                        })
                    }).catch(err => {
                        console.log('error');
                    })
                if (activeRowIndex !== 5) {
                    setActiveRowIndex(prev => prev + 1)
                }
                console.log('clicked Enter');
            }
        }

        if (row.length === maxRowLength) {
            // TODO: check if word is right

            document.addEventListener("keypress", handleEnterPress);
        }

        return () => {
            document.removeEventListener("keypress", handleEnterPress);
        }
    }, [activeRowIndex, row, setActiveRowIndex])


    return (
        <>
            {rows.map((rowAtom, index) => {
                return <Row rowAtom={rowAtom} rowColoursAtom={rowColoursAtoms[index]} rowIndex={index} key={index} />
            })}
        </>
    )
}

export default Grid