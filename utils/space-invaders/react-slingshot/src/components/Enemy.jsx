import React from 'react'
import styles from './Enemy.scss'
import img from './Enemy.gif'


export default (props) => {
    const style = {
        gridRow: props.x,
        gridColumn: props.y
    }
    return (
        <img src={img} style={style} className={styles.enemy} />
    )
}