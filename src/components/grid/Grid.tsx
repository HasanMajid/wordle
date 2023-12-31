"use client"
import { useEffect } from 'react'
import Row from './row/Row'
import { useAtom } from 'jotai'
import { rows } from '@/state'
import { activeRowIndexAtom,  } from '@/state'

function Grid() {
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom);
    const rowAtom = rows[activeRowIndex];
    const [row, setRow] = useAtom(rowAtom);


    useEffect(() => {
        console.log('rendering');
        // const setRow = setRowList[activeRowIndex];
        const handleEnterPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                console.log('clicked Enter');
            }
        }

        console.log(activeRowIndex, row.length);
        if (activeRowIndex < 4 && row.length === 5) {
            // TODO: check if word is right
            let word = ""
            row.map(letter => {
                word += letter;
            })
            const check = async () => {
                fetch("/api/check", {
                    method: "post",
                    body: JSON.stringify({word: word})
                }).then(response => {
                    response.json().then(message => {
                        console.log(message);
                    }).catch(err => {
                        console.log('error fetching');
                    })
                }).catch(err => {
                    console.log('error');
                })
            }
            check()
            document.addEventListener("keypress", handleEnterPress);
            console.log(word);
        }

        return () => {
            document.removeEventListener("keypress", handleEnterPress);
            console.log('destroying');
        }
    }, [activeRowIndex, row])


    return (
        <>
            <Row rowIndex={0} />
            <Row rowIndex={1} />
            <Row rowIndex={2} />
            <Row rowIndex={3} />
            <Row rowIndex={4} />
            <Row rowIndex={5} />
        </>
    )
}

export default Grid