"use client"
import { useEffect } from "react"
import styles from "./row.module.css"
import { activeRowIndexAtom, maxRowLength } from "@/state"
import { useAtom, PrimitiveAtom } from "jotai"

function Row({ rowIndex, rowAtom }: { rowIndex: number, rowAtom: PrimitiveAtom<string[]> }) {
    // const rowAtom = rows[rowIndex];
    const [row, setRow] = useAtom(rowAtom);
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const regex = new RegExp("[a-zA-Z]");
            const isLetter = regex.test(e.key) && e.key.length === 1;
            if (isLetter && row.length < maxRowLength) {
                setRow((prev: string[]) => {
                    const newPrev = [...prev];
                    newPrev.push(e.key);
                    return newPrev;
                });
            }
        }

        if (activeRowIndex === rowIndex) {
            // if (row.length === maxRowLength && rowIndex !== maxRowLength) {
            //     setActiveRowIndex(prev => prev + 1);
            // } else {
                document.addEventListener("keypress", handleKeyDown);
            // }
        }
        return () => {
            document.removeEventListener("keypress", handleKeyDown);
        }
    }, [activeRowIndex, row.length, rowIndex, setActiveRowIndex, setRow])

    return (
        <div className={styles.row}>
            {Array.from(Array(maxRowLength).keys()).map(index => {
                return <div key={index} className={styles.square}>{row[index] ? row[index] : null}</div>
            })}
        </div>
    )
}

export default Row