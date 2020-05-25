import React, { Component } from "react";
import "./route.css";
import Map from "./Map";
import { useLoadScript } from "@react-google-maps/api";
class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: "",
    };
  }

  componentDidMount() {
    console.log("component did mount");
    console.log(this.props);
    console.log("Route did mount");

    let DirectionsService = new window.google.maps.DirectionsService();

    let route = this.props.routeData.fastestRoute;
    let origin = route[0];
    let destination = route[route.length - 1];
    let waypoints = route.slice(1, route.length - 1);
    waypoints = waypoints.map((point) => {
      return { location: point };
    });
    DirectionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        optimizeWaypoints: false,
        travelMode: "DRIVING",
      },
      function (response, status) {
        console.log("ran func");

        if (status === "OK") {
          console.log(response);

          this.setState({ directions: response });
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }.bind(this)
    );
  }

  render() {
    return <Map directions={this.state.directions} />;
  }
}

export default Route;
