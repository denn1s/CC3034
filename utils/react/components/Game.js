import React from 'react'

import Enemy from './Enemy/Enemy.jsx'
import Player from './Player/Player.jsx'
import Bullet from './Bullet/Bullet.jsx'

import * as config from './config'

import img from './stars.gif'

export default class Game extends React.Component {
    constructor() {
        super()

        this.state = {
            playerPos: config.MIDDLE,
            bulletPos: 1100
        }
    }

    shoot() {
        this.setState({
            bulletPos: config.ELEMENT_SIZE
        })
        const frame = () => {
            this.setState({
                bulletPos: this.state.bulletPos + config.MOVEMENT
            })
            requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
    }

    handleKeyDown(e) {
        if (e.key === "ArrowRight") {
            this.setState({
                playerPos: this.state.playerPos + config.MOVEMENT
            })
        }
        if (e.key === "ArrowLeft") {
            this.setState({
                playerPos: this.state.playerPos - config.MOVEMENT
            })
        }
        if (e.key === " ") {
            this.shoot()
        }
    }

    render() {
        // console.log('Game:render')

        const style = {
            width: config.SCREEN_SIZE,
            height: config.SCREEN_SIZE,
            // background: 'red',
            position: 'relative'
        }

        const bg = {
            width: config.SCREEN_SIZE,
            height: config.SCREEN_SIZE,
            position: 'absolute',
            top: 0,
            left: 0
        }        

        const bulletPos = { y: this.state.bulletPos, x: this.state.playerPos }

        return (
          <div style = { style }
            onKeyDown = { this.handleKeyDown.bind(this) }
            tabIndex = "0" >
            <img src={img} style = { bg } />
            <Enemy bulletPos = { bulletPos }
              bottom = { config.MIDDLE }
              left = { 150 }
            /> 
            <Enemy bulletPos = { bulletPos }
              bottom = { config.MIDDLE }
              left = { 350 }
            /> 
            <Enemy bulletPos = { bulletPos }
              bottom = { config.MIDDLE }
              left = { 550 }
            />
            <Enemy bulletPos = { bulletPos }
              bottom = { config.MIDDLE + 150 }
              left = { 150 }
            /> 
            <Enemy bulletPos = { bulletPos }
              bottom = { config.MIDDLE + 150 }
              left = { 350 }
            /> 
            <Enemy bulletPos = { bulletPos }
              bottom = { config.MIDDLE + 150 }
              left = { 550 }
            /> 
            <Bullet bulletPos = { this.state.bulletPos }
              playerPos = { this.state.playerPos }
            /> 
            <Player position = { this.state.playerPos } /> 
          </div>
        )
    }
}