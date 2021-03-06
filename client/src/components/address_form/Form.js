import React, { Component } from "react";
import "./form.css";
import Autocomplete from "./autocomplete/Autocomplete";
import Transport from "./Transport";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      waypoints: ["", ""],
      destination: "",
      travelMode: "driving",
    };
  }
  changeTravelMode = (mode) => {
    this.setState({ travelMode: mode });
  };
  changeWaypoint = (address, index) => {
    let waypoints = this.state.waypoints;
    waypoints[index] = address;
    this.setState({ waypoints });
    console.log(this.state);
  };

  changeOrigin(v) {
    this.setState({ origin: v });
  }

  changeDestination(v) {
    this.setState({ destination: v });
  }

  handleSubmit(event) {
    let body = {};
    body.waypoints = this.state.waypoints;
    body.origin = this.state.origin;
    body.destination = this.state.destination;
    body.mode = this.state.travelMode;
    event.preventDefault();
    fetch("/api/route/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        // this.props.result = result;
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Bad response: " + response);
        }
      })
      .then((data) => {
        this.props.onRouteDataResponse(data);
        this.props.history.push("/route");
      })
      .catch((error) => console.log(error));
  }

  removeWaypoint(index) {
    let waypoints = this.state.waypoints;
    waypoints.splice(index, 1);
    this.setState({ waypoints });
  }

  addWaypoint() {
    // State change will cause component re-render
    this.setState({
      waypoints: [...this.state.waypoints, ""],
    });
  }

  render() {
    let label_waypoints;
    if (this.state.waypoints.length >= 1) {
      label_waypoints = (
        <label className="bmd-label-static" htmlFor="waypoint0">
          Waypoints
        </label>
      );
    }

    let button_add = (onClick) => {
      return (
        <button
          type="button"
          className="btn btn-default btn-sm button-add"
          aria-label="Add"
          onClick={onClick}
        >
          <i className="fa fa-plus"></i>
        </button>
      );
    };

    let button_close = (onClick) => {
      return (
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={onClick}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      );
    };

    let origin_part = () => {
      return (
        <div className="form-group mb-1 bmd-form-group">
          <label className="bmd-label-static" htmlFor="origin">
            Origin
          </label>
          <div className="input-line row">
            <div className="col">
              <Autocomplete
                placeholder="Origin address"
                onChange={(v) => this.changeOrigin(v)}
                value={this.state.origin}
              />
            </div>
          </div>
        </div>
      );
    };

    let destination_part = () => {
      return (
        <div className="form-group bmd-form-group">
          <label className="bmd-label-static" htmlFor="destination">
            Destination
          </label>
          <div className="input-line row">
            <div className="col">
              <Autocomplete
                placeholder="Destination address"
                onChange={(v) => this.changeDestination(v)}
                value={this.state.destination}
              />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div id="form" className="row d-flex justify-content-center mr-0 mt-4">
        <form
          className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-11 pr-0"
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          {origin_part()}
          <div id="waypoints" className="form-group mb-0 bmd-form-group">
            {label_waypoints}
            {this.state.waypoints.map((address, index) => {
              return (
                <div key={index} className="input-line row">
                  <div className="waypoint col">
                    <Autocomplete
                      placeholder="Waypoint address"
                      onChange={(v) => {
                        console.log(v);
                        this.changeWaypoint(v, index);
                      }}
                      value={address}
                    />
                  </div>
                  {button_close(() => this.removeWaypoint(index))}
                </div>
              );
            })}
            {button_add((e) => {
              this.addWaypoint(e);
            })}
          </div>
          {destination_part()}
          <div className="form-group">
            <div className="row h-50px">
              <div className="col col-6 h-50px d-flex justify-content-center">
                <div className="transport">
                  <Transport changeTravelMode={this.changeTravelMode} />
                </div>
              </div>
              <div className="col col-6 d-flex justify-content-start h-50px">
                <button
                  type="submit"
                  className="btn btn-teal btn-mlg btn-rounded btn-raised"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Form;
