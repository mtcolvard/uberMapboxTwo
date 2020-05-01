import React from 'react'
import ReactMapGl, {NavigationControl, GeolocateControl} from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
}

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      viewport: {longitude: -0.084254, latitude: 51.518961, zoom: 12}
    }
  }

  render () {
    const {viewport} = this.state
    return (
      <ReactMapGl {...viewport}
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        height='100vh'
        width='100vw'
        onViewportChange={viewport => this.setState({viewport})}>
        <div>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        </div>
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl />
        </div>
      </ReactMapGl>
    )
  }
}

export default Map
