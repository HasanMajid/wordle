"use client"
import { useAtom } from 'jotai';
import Row from './row/Row'
import { rows, rowColoursAtoms, useGridAtom, winStateAtom, useTime } from '@/state'

function Grid() {
    const [winState] = useAtom(winStateAtom);
    const { isChecking } = useGridAtom();

    const { hours, minutes, loadingTime } = useTime()

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
                {!loadingTime ? <h4 className='heading' style={{ width: "fit-content", height: "fit-content", margin: "auto" }}>{hours} hours and {minutes} until next word</h4> : null}
                {winState ? <h2 className='heading' style={{ width: "fit-content", height: "fit-content", margin: "auto" }}>You Win</h2> : <h2></h2>}
            </div>
            {rows.map((rowAtom, index) => {
                return <Row rowAtom={rowAtom} rowColoursAtom={rowColoursAtoms[index]} rowIndex={index} key={index} />
            })}
            {isChecking ? <h2 style={{ width: "fit-content", margin: "auto" }}>Checking</h2> : null}
        </>
    )
}

export default Grid