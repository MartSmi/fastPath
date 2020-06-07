import React, { Component } from "react";
import withAuth from "../auth/withAuth";
import AuthHelperMethods from "../auth/AuthHelperMethods";
import "./routes.css";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
    };
  }
  Auth = new AuthHelperMethods();

  async componentDidMount() {
    let res = await this.fetchRoutes();
    res = res.slice(0).reverse();
    this.setState({ routes: res });
  }

  fetchRoutes = async () => {
    const token = this.Auth.getToken();
    try {
      const response = await fetch("/api/routes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
        },
      });

      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Bad response: " + response);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  deleteRoute = async (index) => {
    const token = this.Auth.getToken();
    try {
      const response = await fetch("/api/route/delete", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ id: this.state.routes[index]._id }),
      });

      if (response.status === 200) {
        let tmp = this.state.routes;
        tmp.splice(index, 1);
        this.setState({ routes: tmp });
        return response.json();
      } else {
        throw new Error("Bad response: " + response);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  viewRoute(index) {
    console.log(this.props);
    this.props.viewRoute({ route: this.state.routes[index] });
    this.props.history.push("/route");
  }

  routes = () => {
    if (this.state.routes === undefined) {
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div
              className="mt-5 rounded-lg col-7 alert alert-primary"
              role="alert"
            >
              You don't have any routes
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mt-5">
          <div className="row">
            {this.state.routes.map((route, index) => {
              return (
                <div
                  className="col col-12 col-lg-4 col-md-6 col-sm-12  mb-4"
                  key={index}
                >
                  <div className="card">
                    <div
                      onClick={() => this.viewRoute(index)}
                      className="card-body"
                    >
                      <div className="card-title h6 text-center">
                        {route.origin + " - " + route.destination}
                      </div>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        Last updated {route.created_at}
                      </small>
                      <button
                        onClick={() => this.deleteRoute(index)}
                        type="button"
                        className="close pull-right"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="h2 mt-4">Your routes</div>
        <div id="routes" className="mx-auto w-80">
          {this.routes()}
        </div>
        <button
          id="createRoute"
          className="btn btn-rounded btn-teal mt-5"
          onClick={() => this.props.history.push("/")}
        >
          Create Route
        </button>
      </div>
    );
  }
}

export default withAuth(Routes);
