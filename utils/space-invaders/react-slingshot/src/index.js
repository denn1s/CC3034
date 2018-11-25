import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'


const buildEnemies = (startingRow, endingRow, startingCol, endingCol) => {
    const enemies = []
    for (let i = startingCol; i < endingCol; i += 2) {
        for (let j = startingRow; j < endingRow; j +=2) {
            enemies.push([i, j])
        }
    }
    return enemies
}


const initialState = {
    playerPos: 15,
    enemies: buildEnemies(11, 30, 10, 20),
    bulletPos: [-1, -1],
    finishMessage: ''
}

const reducer = (state = initialState, action) => {
    if (state.enemies.find(enemy => enemy[0] === 29)) {
        return {
            ...state,
            finishMessage: 'You Lose'
        }
    }
    if (state.enemies.length === 0) {
        return {
            ...state,
            finishMessage: 'You Win'
        }
    }
    if (action.type === 'MOVE') {
        if (action.direction === 'LEFT') {
            return {
                ...state,
                playerPos: state.playerPos - 1
            }
        }
        if (action.direction === 'RIGHT') {
            return {
                ...state,
                playerPos: state.playerPos + 1
            }
        }
    }
    if (action.type === 'BULLET') {
        const enemies = [...state.enemies]
        const hitEnemy = enemies.findIndex(enemy => enemy[0] === action.position[0] && enemy[1] === action.position[1])
        if (hitEnemy > -1) {
            enemies.splice(hitEnemy, 1)
        }
        return {
            ...state,
            enemies,
            bulletPos: action.position
        }
    }
    if (action.type === 'ENEMIES') {
        if (action.direction === 'LEFT') {
            const enemies = []
            for (let i = 0; i < state.enemies.length; i++) {
                enemies[i] = [state.enemies[i][0], state.enemies[i][1] - 1]
            }
            return {
                ...state,
                enemies
            }
        }
        if (action.direction === 'RIGHT') {
            const enemies = []
            for (let i = 0; i < state.enemies.length; i++) {
                enemies[i] = [state.enemies[i][0], state.enemies[i][1] + 1]
            }
            return {
                ...state,
                enemies
            }
        }
        if (action.direction === 'DOWN') {
            const enemies = []
            for (let i = 0; i < state.enemies.length; i++) {
                enemies[i] = [state.enemies[i][0] + 1, state.enemies[i][1]]
            }
            return {
                ...state,
                enemies
            }
        }
    }
    return state
}

const store = createStore(reducer, initialState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)