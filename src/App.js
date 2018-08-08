import React, { Component } from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'

class App extends Component {
  render() {
    return (
      <Router>
      <div id="appmain">
        <Routes />
      </div>
    </Router>
    );
  }
}

export default hot(module)(App)
