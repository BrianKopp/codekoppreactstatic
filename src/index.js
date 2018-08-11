import React from 'react'
import ReactDOM from 'react-dom'

// import css
import './static/css/color-6.css'
import './static/css/magnific-popup.css'
import './static/css/style.css'
import './static/css/responsive.css'

// import top-level javascript

// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  // Render!
  render(App)
}
