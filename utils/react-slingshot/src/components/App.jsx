import React from 'react'
import { connect } from 'react-redux'


const incrementAction = {
  type: 'INCREMENT'
}



const App = (props) => (
  <h1 onClick={props.doIncrement}>Hello world {props.count} times</h1>
)


function mapStateToProps(state) {
  return {
    count: state.count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doIncrement: () => { dispatch(incrementAction) }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
