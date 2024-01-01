"use client"
import Row from './row/Row'
import { rows, rowColoursAtoms, useGridAtom } from '@/state'

function Grid() {

    const { isChecking } = useGridAtom();


    return (
        <>
            {rows.map((rowAtom, index) => {
                return <Row rowAtom={rowAtom} rowColoursAtom={rowColoursAtoms[index]} rowIndex={index} key={index} />
            })}
            {isChecking ? <h2 style={{ width: "fit-content", margin: "auto" }}>Checking</h2> : null}
        </>
    )
}

export default Grid