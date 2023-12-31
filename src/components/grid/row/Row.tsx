"use client"
import { useEffect } from "react"
import styles from "./row.module.css"
import { activeRowIndexAtom, maxRowLength, useRowAtom } from "@/state"
import { useAtom, PrimitiveAtom } from "jotai"

function Row({ rowIndex, rowAtom, rowColoursAtom }: { rowIndex: number, rowAtom: PrimitiveAtom<string[]>, rowColoursAtom: PrimitiveAtom<string[]> }) {
    // const rowAtom = rows[rowIndex];
    const [row, setRow] = useAtom(rowAtom);
    const [rowColour, setRowColour] = useAtom(rowColoursAtom)

    useRowAtom(rowAtom, rowIndex);

    return (
        <div className={styles.row}>
            {Array.from(Array(maxRowLength).keys()).map(index => {
                return <div key={index} className={styles.square} style={{ backgroundColor: rowColour[index] }}>{row[index] ? row[index] : null}</div>
            })}
        </div>
    )
}

export default Row