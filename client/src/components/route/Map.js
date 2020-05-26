import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
    };
  }

  mapContainerStyle = {
    position: "relative",
    top: "5vh",
    left: "4vw",
    height: "75vh",
    width: "68vw",
  };

  // center = {
  //   lat: this.props.lat || 54.687157,
  //   lng: this.props.lng || 50.279652,
  // };

  componentDidMount() {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const origin = this.props.route.origin || {
      lat: 40.756795,
      lng: -73.954298,
    };
    const destination = this.props.route.destination || {
      lat: 41.756795,
      lng: -78.954298,
    };

    const waypoints = this.props.route.waypoints.map((address) => {
      return { location: address, stopover: true };
    });
    console.log("this.props.route");
    console.log(this.props.route);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
      //        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
      //        defaultZoom={13}
      //        disableDefaultUI={true}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={this.mapContainerStyle} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
