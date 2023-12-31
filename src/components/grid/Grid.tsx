"use client"
import { useEffect, useState } from 'react'
import Row from './row/Row'
import { useAtom } from 'jotai'
import { maxRowLength, rows, rowColoursAtoms } from '@/state'
import { activeRowIndexAtom, getActiveRowAtom } from '@/state'
import { checkWord } from '@/utils/helpers'

function Grid() {
    const [isLoading, setIsLoading] = useState(false);
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
                setIsLoading(true);
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
                if (activeRowIndex !== 5 && row.length === maxRowLength) {
                    setActiveRowIndex(prev => prev + 1)
                }
                setIsLoading(false)
                console.log('clicked Enter');
            }
        }

        if (row.length === maxRowLength && isLoading === false) {
            // TODO: check if word is right and display win state
            document.addEventListener("keydown", handleEnterDown);
        }

        return () => {
            document.removeEventListener("keydown", handleEnterDown);
        }
    }, [activeRowIndex, isLoading, row, setActiveRowIndex, setRowColours])


    return (
        <>
            {rows.map((rowAtom, index) => {
                return <Row rowAtom={rowAtom} rowColoursAtom={rowColoursAtoms[index]} rowIndex={index} key={index} />
            })}
        </>
    )
}

export default Grid