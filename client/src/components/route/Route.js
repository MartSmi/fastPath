import React, { Component } from "react";
import "./route.css";
import Map from "./Map";
import RouteBoard from "./RouteBoard";
import AuthHelperMethods from "../auth/AuthHelperMethods";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: "",
      firstMapRender: true,
      markedAddress: null,
      alertShow: false,
    };
    this.handleAddressClick = this.handleAddressClick.bind(this);
    this.shouldRerenderMap = this.shouldRerenderMap.bind(this);
  }

  shouldRerenderMap() {
    console.log(this.state.firstMapRender);
    if (this.state.firstMapRender) {
      console.log("firstMapRender");

      this.setState({ firstMapRender: false });
      return true;
    }
    return false;
  }

  Auth = new AuthHelperMethods();

  handleAddressClick(index) {
    this.setState({ markedAddress: index });
  }

  onShowAlert = () => {
    this.setState({ alertShow: true }, () => {
      window.setTimeout(() => {
        this.setState({ alertShow: false });
      }, 1000);
    });
  };
  saveRoute(e) {
    if (this.Auth.loggedIn()) {
      const token = this.Auth.getToken();
      fetch("/api/route/save", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(this.props.routeData),
      })
        .then((response) => {
          // this.props.result = result;
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Bad response: " + response);
          }
        })
        .catch((error) => console.log(error));
    } else {
      this.onShowAlert();
    }
  }

  render() {
    console.log("did render");
    const alertBox = () => {
      if (this.state.alertShow) {
        return (
          <div className="alert alert-success" role="alert">
            Route saved!
          </div>
        );
      }
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div id="mapHolder" className="col-md-8">
            <Map
              googleMapURL={
                "https://maps.googleapis.com/maps/api/js?key=" +
                process.env.REACT_APP_GOOGLE_API_KEY
              }
              loadingElement={<div style={{ height: `100%` }} />}
              shouldRender={this.state.alertShowyy}
              route={this.props.routeData}
            />
          </div>
          <div className="col-md align-self-center board d-none d-md-block">
            <RouteBoard
              route={this.props.routeData}
              handleAddressClick={this.handleAddressClick}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="row">
            <div className="col col-3">
              <CopyToClipboard text={this.props.routeData.urlShort}>
                <button className="btn btn-teal">Copy Route</button>
              </CopyToClipboard>
            </div>
            <div className="col col-3">
              <button
                onClick={(e) => this.saveRoute(e)}
                className="btn btn-teal"
              >
                Save route
              </button>
            </div>
          </div>
        </div>

        {alertBox()}
      </div>
    );
  }
}

export default Route;
