"use client"
import { useEffect } from "react"
import styles from "./row.module.css"
import { activeRowIndexAtom, maxRowLength, useRowAtom } from "@/state"
import { useAtom, PrimitiveAtom } from "jotai"

function Row({ rowIndex, rowAtom }: { rowIndex: number, rowAtom: PrimitiveAtom<string[]> }) {
    // const rowAtom = rows[rowIndex];
    const [row, setRow] = useAtom(rowAtom);

    useRowAtom(rowAtom, rowIndex);

    return (
        <div className={styles.row}>
            {Array.from(Array(maxRowLength).keys()).map(index => {
                return <div key={index} className={styles.square}>{row[index] ? row[index] : null}</div>
            })}
        </div>
    )
}

export default Row