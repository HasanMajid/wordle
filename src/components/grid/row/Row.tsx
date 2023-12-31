"use client"
import { useEffect } from "react"
import styles from "./row.module.css"
import { rows, activeRowIndexAtom } from "@/state"
import { useAtom, PrimitiveAtom } from "jotai"

function Row({ rowIndex, rowAtom }: { rowIndex: number, rowAtom: PrimitiveAtom<string[]> }) {
    // const rowAtom = rows[rowIndex];
    const [row, setRow] = useAtom(rowAtom);
    const [activeRowIndex, setActiveRowIndex] = useAtom(activeRowIndexAtom);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const regex = new RegExp("[a-zA-Z]");
            const isLetter = regex.test(e.key) && e.key.length === 1;
            if (isLetter && row.length < 5) {
                setRow((prev: string[]) => {
                    const newPrev = [...prev];
                    newPrev.push(e.key);
                    return newPrev;
                });
            }
        }

        if (activeRowIndex === rowIndex) {
            // if (row.length === 5 && rowIndex !== 5) {
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
            <div className={styles.square}>{row[0] ? row[0] : null}</div>
            <div className={styles.square}>{row[1] ? row[1] : null}</div>
            <div className={styles.square}>{row[2] ? row[2] : null}</div>
            <div className={styles.square}>{row[3] ? row[3] : null}</div>
            <div className={styles.square}>{row[4] ? row[4] : null}</div>
        </div>
    )
}

export default Row