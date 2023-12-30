import { CSSProperties } from 'react'
import Row from './row/Row'

function Grid() {
    const inputStyle: CSSProperties = { width: "4rem", height: "4rem" }
    return (
        <>
            <Row/>
            <Row/>
            <Row/>
            <Row/>
            <Row/>
        </>
    )
}

export default Grid