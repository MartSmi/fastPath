import React, { Component } from "react";
import "./route.css";
import Map from "./Map";
import { withScriptjs } from "react-google-maps";
class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: "",
    };
  }

  render() {
    const TrueMap = () => {
      const MapLoader = withScriptjs((props) => <Map {...props} />);
      console.log("this.props.routeData.route");
      console.log(this.props.routeData);

      return (
        <MapLoader
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?key=" +
            process.env.REACT_APP_GOOGLE_API_KEY
          }
          loadingElement={<div style={{ height: `100%` }} />}
          route={this.props.routeData.route}
        />
      );
    };

    return <TrueMap />;
  }
}

export default Route;
