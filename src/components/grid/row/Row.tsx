import styles from "./row.module.css"

function Row({rowData, id} : {rowData: Array<string>, id: number}) {
    return (
        <div className={styles.row}>
            {/* {rowData.map((letter, index) => {
                return <div className={styles.square} key={index}>{letter}</div>
            })} */}
            <div className={styles.square}>{rowData[0] ? rowData[0] : null}</div>
            <div className={styles.square}>{rowData[1] ? rowData[1] : null}</div>
            <div className={styles.square}>{rowData[2] ? rowData[2] : null}</div>
            <div className={styles.square}>{rowData[3] ? rowData[3] : null}</div>
            <div className={styles.square}>{rowData[4] ? rowData[4] : null}</div>
        </div>
    )
}

export default Row