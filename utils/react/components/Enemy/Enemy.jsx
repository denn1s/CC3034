import React from 'react'
import * as config from '../config'

import img from './enemy.gif'

export default class Enemy extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      display: 'block',
      left: props.left
    }
  }
  
  componentWillMount() {
    // console.log('Enemy:componentWillMount')
    
    let movement = config.MOVEMENT
      
    const frame = () => {      
      if (this.state.left + config.ELEMENT_SIZE == config.SCREEN_SIZE || this.state.left === 0) {
        movement *= -1
      }
      this.setState({
        left: this.state.left + movement
      })
            
      const me = {
        min: {
          X: this.state.left,
          Y: this.props.bottom - config.ELEMENT_SIZE
        },
        max: {
          X: this.state.left + config.ELEMENT_SIZE,
          Y: this.props.bottom 
        }
      }
      
      const other = {
        min: {
          X: this.props.bulletPos.x,
          Y: this.props.bulletPos.y - config.ELEMENT_SIZE
        },
        max: {
          X: this.props.bulletPos.x + config.ELEMENT_SIZE,
          Y: this.props.bulletPos.y
        }
      }
           
      if(!(
        me.max.X < other.min.X || 
        me.max.Y < other.min.Y || 
        me.min.X > other.max.X || 
        me.min.Y > other.max.Y
      )) {
        this.setState({
          display: 'none'
        })
      }
      
      requestAnimationFrame(frame)
    }
    
    requestAnimationFrame(frame)
  }
  
  render() {
    // console.log('Enemy:render')
    const style = {
      width: config.ELEMENT_SIZE,
      height: config.ELEMENT_SIZE,
      // background: 'yellow',
      position: 'absolute',
      bottom: this.props.bottom,
      left: this.state.left,
      display: this.state.display
    }
    return <img style={style} src={img} />
  }
}