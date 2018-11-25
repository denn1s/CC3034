import React from 'react'
import { connect } from 'react-redux'
import Player from './Player'
import Enemy from './Enemy'
import Bullet from './Bullet'
import styles from './App.scss'


function incrementBy(valor) {
    return {
        type: 'INCREMENT',
        mipropiedad: valor
    }
}


class App extends React.Component {
    componentWillMount() {
        let num = 0
        const frame = () => {
            const step = num % 21
            if (step >= 1 && step <= 10) {
                this.props.enemiesLeft()
            } else if (step >= 11 && step <= 20) {
                this.props.enemiesRight()
            } else {
                this.props.enemiesDown()
            }
            num += 1
            setTimeout(
                () => requestAnimationFrame(frame),
                1000
            )
        }
        requestAnimationFrame(frame)
    }

    render() {
        if (this.props.finishMessage) {
            return (
                <div className={styles.finish}>
                    {this.props.finishMessage}
                </div>
            )
        }
        return (
            <div className={styles.background}>
                <Player />
                {
                    this.props.enemies.map((enemy, index) => (
                        <Enemy key={index} x={enemy[0]} y={enemy[1]} />
                    ))
                }
                <Bullet />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        enemies: state.enemies,
        finishMessage: state.finishMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addOne: (valor) => dispatch(incrementBy(valor)),
        enemiesLeft: () => dispatch({
            type: 'ENEMIES',
            direction: 'LEFT'
        }),
        enemiesRight: () => dispatch({
            type: 'ENEMIES',
            direction: 'RIGHT'
        }),
        enemiesDown: () => dispatch({
            type: 'ENEMIES',
            direction: 'DOWN'
        })
    }
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp