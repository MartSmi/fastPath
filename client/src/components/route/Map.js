import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    mapStyle: {
      position: "relative",
      left: "7%",
      top: "5vh",
      height: "70vh",
      width: "65%",
    },
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={this.props.mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBqT6coSPD1gBgflK-dUj_Ct-uGR8YEvbQ" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Waypoint"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
