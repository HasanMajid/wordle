import { CSSProperties } from 'react'

function Row() {
    const inputSize = "4rem";
    const inputStyle: CSSProperties = { width: inputSize, height: inputSize, marginBottom: "10px" }
    return (
        <div style={{ width: "fit-content", margin: "auto" }}>
            <input type="text" style={inputStyle} />
            <input type="text" style={inputStyle} />
            <input type="text" style={inputStyle} />
            <input type="text" style={inputStyle} />
            <input type="text" style={inputStyle} />
        </div>
    )
}

export default Row