import React, { Component } from "react";
import "./form.css";
import Autocomplete from "./autocomplete/Autocomplete";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "Vilnius, Lithuania",
      waypoints: ["Klaipėda, Lithuania", "Panemunė, Lithuania"],
      destination: "Kaunas, Lithuania",
    };
  }

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
    fetch("/api/route", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
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
    event.preventDefault();
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
      label_waypoints = <label htmlFor="waypoint0">Waypoints</label>;
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
          className="close col-sm-"
          aria-label="Close"
          onClick={onClick}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      );
    };

    let origin_part = () => {
      if (this.state.origin !== null) {
        return (
          <div className="form-group">
            <label htmlFor="origin">Origin</label>
            <div className="input-line row">
              <div className="col">
                <Autocomplete
                  placeholder="Origin address"
                  onChange={(v) => this.changeOrigin(v)}
                  value={this.state.origin}
                />
              </div>
              {button_close(() => {
                this.changeOrigin(null);
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div className="form-group">
            {button_add(() => {
              this.changeOrigin("");
            })}
          </div>
        );
      }
    };

    let destination_part = () => {
      if (this.state.destination !== null) {
        return (
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <div className="input-line row">
              <div className="col">
                <Autocomplete
                  placeholder="Destination address"
                  onChange={(v) => this.changeDestination(v)}
                  value={this.state.destination}
                />
              </div>
              {button_close(() => this.changeDestination(null))}
            </div>
          </div>
        );
      } else {
        return (
          <div className="form-group">
            {button_add(() => {
              this.changeDestination("");
            })}
          </div>
        );
      }
    };

    return (
      <div id="form">
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          {origin_part()}
          <div id="waypoints" className="form-group">
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
