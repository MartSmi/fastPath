import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // return true;
    if (this.state.directions === null && nextState.directions !== null) {
      return true;
    } else if (nextProps.route === this.props.route) {
      return false;
    } else {
      return true;
    }
  }

  mapContainerStyle = {
    height: '100%',
    width: '100%',
  };

  divStyle = {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    width: '100%',
  };

  options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  componentDidMount() {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const origin = this.props.route.origin;
    const destination = this.props.route.destination;

    const waypoints = this.props.route.waypoints.map(address => {
      return { location: address, stopover: true };
    });

    let mode = this.props.route.mode || google.maps.TravelMode.DRIVING;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: mode.toUpperCase(),
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
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap options={this.options}>
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div style={this.divStyle}>
        <GoogleMapExample
          containerElement={<div style={this.mapContainerStyle} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
