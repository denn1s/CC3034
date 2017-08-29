import React from 'react'
import * as config from '../config'

import img from './bullet.gif'

export default class Bullet extends React.Component {
  render() {
    // console.log('Bullet:render')
    const style = {
      width: config.ELEMENT_SIZE,
      height: config.ELEMENT_SIZE,
      // background: 'pink',
      position: 'absolute',
      bottom: this.props.bulletPos,
      left: this.props.playerPos
    }
    return <img style={style} src={img} />
  }
}