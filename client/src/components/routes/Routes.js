import React, { Component } from "react";
import withAuth from "../auth/withAuth";
import "./routes.css";

class Routes extends Component {
  constructor(props) {
    super(props);
  }
  routes = () => {
    console.log(this.props);

    return (
      <div className="container mt-5">
        <div className="row">
          {this.props.routes.map((route, index) => {
            return (
              <div
                className="col col-12 col-lg-4 col-md-6 col-sm-12  mb-4"
                key={index}
              >
                <div className="card">
                  <div className="card-body">
                    <div className="card-title h6 text-center">
                      {route.origin + " - " + route.destination}
                    </div>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="h2 mt-4">Your routes</div>
        <button
          id="createRoute"
          className="btn btn-rounded btn-teal"
          onClick={() => this.props.history.push("/")}
        >
          Create Route
        </button>
        <div id="routes" className="mx-auto w-80">
          {this.routes()}
        </div>
      </div>
    );
  }
}

export default withAuth(Routes);
