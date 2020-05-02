import React from 'react'
import ReactMapGl, {BaseControl, NavigationControl, GeolocateControl, LinearInterpolator, FlyToInterpolator, HTMLOverlay} from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
}

const navigationControlStyle = {
  position: 'absolute',
  right: 0
}

const fieldStyle = {
  width: '100vw',
  height: '5vh',
  position: 'absolute',
  bottom: 0,
  left: 0

}


const lngLat = [-0.084254, 51.518961]

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      viewport: {longitude: lngLat[0], latitude: lngLat[1], zoom: 12},
      formData: {}

    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleMouseDown( {lngLat} ) {
    this.setState({viewport: {
      longitude: lngLat[0],
      latitude: lngLat[1],
      zoom: 12,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator({
        curve: 2.4})
    }})
  }

  handleChange(e) {
      const formData = { ...this.state.formData, [e.target.name]: e.target.value }
      this.setState({ formData, error: '' })
    }

  handleSubmit(e) {
    e.preventDefault()
    console.log('return successful')

  }


  render () {
    const {viewport} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Add destination to plan route"
            onChange={this.handleChange}
          />
        </form>
        <div>
          <ReactMapGl {...viewport}
            mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            height='100vh'
            width='100vw'
            onViewportChange={viewport => this.setState({viewport})}
            onClick={this.handleMouseDown}>
            <div>
              <GeolocateControl
                style={geolocateStyle}
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
                captureClick={false}
              />
            </div>
            <div style={navigationControlStyle}>
              <NavigationControl/>
            </div>
          </ReactMapGl>
        </div>
      </div>
    )
  }
}

export default Map
