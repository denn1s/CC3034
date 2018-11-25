import React from 'react'
import { connect } from 'react-redux'
import styles from './Bullet.scss'
import img from './Bullet.gif'


class Bullet extends React.Component {
    componentWillReceiveProps() {
        if (this.props.pos[0] < 0) {
            const frame = () => {
                if (this.props.pos[0] >= 0) {
                    this.props.advance([this.props.pos[0] - 1, this.props.pos[1]])
                    requestAnimationFrame(frame)
                }
            }
            requestAnimationFrame(frame)
        }
    }

    render() {
        const style = {
            gridRow: this.props.pos[0],
            gridColumn: this.props.pos[1]
        }

        if (this.props.pos[0] < 0 || this.props.pos[1] < 0) {
            return null
        }

        return (
            <img
                src={img}
                style={style}
                className={styles.bullet}
            />
        )
    }
}


function mapStateToProps(state) {
    return {
        pos: state.bulletPos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        advance: (position) => {
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
)(Bullet)
