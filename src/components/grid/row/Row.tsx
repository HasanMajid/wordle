"use client";
import styles from "./row.module.css";
import { maxRowLength, useRowAtom } from "@/state";
import { useAtom, PrimitiveAtom } from "jotai";
import { activeRowIndexAtom } from "@/state";
import { CSSProperties, useEffect, useState } from "react";

function Row({
    rowIndex,
    rowAtom,
    rowColoursAtom,
}: {
    rowIndex: number;
    rowAtom: PrimitiveAtom<string[]>;
    rowColoursAtom: PrimitiveAtom<string[]>;
}) {
    const [row, setRow] = useAtom(rowAtom);
    const [rowColour, setRowColour] = useAtom(rowColoursAtom);
    const [activeBox, setActiveBox] = useState(0);
    const [activeRowIndex] = useAtom(activeRowIndexAtom);
    const activeSquareColour = "whitesmoke";
    useRowAtom(rowAtom, rowIndex);

    useEffect(() => {
        setActiveBox(row.length);
    }, [row]);

    return (
        <div className={styles.row}>
            {Array.from(Array(maxRowLength).keys()).map((index) => {
                return (
                    <div
                        key={index}
                        className={styles.square + " " + " "}
                        style={
                            {
                                backgroundColor: rowColour[index],
                                borderBlock: (activeBox === index && activeRowIndex === rowIndex) ? `5px solid ${activeSquareColour}` : "",
                                borderRight: (activeBox - 1 === index && activeRowIndex === rowIndex) ? `2px solid ${activeSquareColour}` : ((activeBox === index && activeRowIndex === rowIndex) ? `5px solid ${activeSquareColour}` : ""),
                                borderLeft: (activeBox === index && activeRowIndex === rowIndex) ? ((index !== 0) ? `3px solid ${activeSquareColour}` : `5px solid ${activeSquareColour}`) : "",
                                // borderColor: (activeBox === index && activeRowIndex === rowIndex) ?  "gray" : "",
                            }}
                    >
                        {row[index] ? row[index] : null}
                    </div>
                );
            })}
        </div>
    );
}

export default Row;
