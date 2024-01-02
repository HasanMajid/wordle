"use client"
import { useAtom } from 'jotai';
import Row from './row/Row'
import { rows, rowColoursAtoms, useGridAtom, winStateAtom } from '@/state'

function Grid() {
    const [winState] = useAtom(winStateAtom);
    const { isChecking } = useGridAtom();


    return (
        <>
            <div>
                {winState ? <h2 className='heading' style={{ width: "fit-content", height: "fit-content", margin: "auto" }}>You Win</h2> : null}
            </div>
            {rows.map((rowAtom, index) => {
                return <Row rowAtom={rowAtom} rowColoursAtom={rowColoursAtoms[index]} rowIndex={index} key={index} />
            })}
            {isChecking ? <h2 style={{ width: "fit-content", margin: "auto" }}>Checking</h2> : null}
        </>
    )
}

export default Grid