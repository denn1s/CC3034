import React from 'react'
import ReactDom from 'react-dom'
import Root from './components/Root'
import { createStore } from 'redux'

const initialState = {
  count: 0,
  variable2: 'hola'
}


function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state
  }
}


const store = createStore(reducer, initialState)

ReactDom.render(
  <Root store={store} />,
  document.getElementById('app')
)
