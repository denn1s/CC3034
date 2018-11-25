import React from 'react'
import { connect } from 'react-redux'
import styles from './Player.scss'
import img from './Ship.gif'


class Player extends React.Component {
    handleKeyDown(event) {
        if (event.key === 'ArrowLeft' && this.props.pos > 1) {
            this.props.move('LEFT')
        }
        if (event.key === 'ArrowRight' && this.props.pos < 60) {
            this.props.move('RIGHT')
        }
        if (event.key === ' ' && this.props.bulletPos[0] < 0) {
            this.props.shoot([28, this.props.pos])
        }
    }

    render() {
        const style = {
            gridColumn: this.props.pos
        }
        return (
            <img
                src={img}
                onKeyDown={this.handleKeyDown.bind(this)}
                tabIndex="0"
                style={style}
                className={styles.player}
            />
        )
    }
}


function mapStateToProps(state) {
    return {
        pos: state.playerPos,
        bulletPos: state.bulletPos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        move: (direction) => {
            dispatch({
                type: 'MOVE',
                direction
            })
        },
        shoot: (position) => {
            dispatch({
                type: 'BULLET',
                position
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)
