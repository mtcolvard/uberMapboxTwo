import React from 'react'
import ReactDOM from 'react-dom'
import './scss/style.scss'

import Map from './components/Map'

class App extends React.Component {
  constructor() {
    super()
  }
  render () {
    return <Map />
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
