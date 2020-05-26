import React, { Component } from "react";
import "./route.css";
import Map from "./Map";
import RouteBoard from "./RouteBoard";
import { withScriptjs } from "react-google-maps";
class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: "",
      markedAddress: null,
    };
    this.handleAddressClick = this.handleAddressClick.bind(this);
  }

  handleAddressClick(index) {
    console.log("the_index: " + index);

    this.setState({ markedAddress: index });
  }

  render() {
    const TrueMap = () => {
      const MapLoader = withScriptjs((props) => (
        <Map {...props} markedAddress={this.state.markedAddress} />
      ));
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

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <TrueMap />
          </div>
          <div className="col-md align-self-center board">
            <RouteBoard
              route={this.props.routeData.route}
              handleAddressClick={this.handleAddressClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Route;
