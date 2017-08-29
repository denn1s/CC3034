import React from 'react'

import * as config from '../config'

import img from './ship.gif'


export default class Player extends React.Component {
  render() {
    // console.log('Player:render')
    const style = {
      width: config.ELEMENT_SIZE * 0.8,
      // height: config.ELEMENT_SIZE,
      // background: 'blue',
      position: 'absolute',
      bottom: 0,
      left: this.props.position
    }
    return <img style={style} src={img} />
  }
}