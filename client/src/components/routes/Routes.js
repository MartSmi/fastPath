import React, { Component } from "react";
import withAuth from "../auth/withAuth";
import AuthHelperMethods from "../auth/AuthHelperMethods";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Intent,
  Popover,
  PopoverInteractionKind,
  Position,
  Classes,
} from "@blueprintjs/core";
import moment from "moment";
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
          <div className="row" id="routesRow">
            {this.state.routes.map((route, index) => {
              return (
                <div
                  className="col col-12 col-lg-4 col-md-6 col-sm-12  mb-4"
                  key={index}
                >
                  <div
                    className="card h-100"
                    onClick={() => this.viewRoute(index)}
                  >
                    <div className="card-body d-flex justify-content-center">
                      <div className="card-title h6 text-center">
                        {route.origin + " - " + route.destination}
                      </div>
                    </div>
                    <div
                      className="card-footer"
                      onClick={(e) => {
                        // prevents route delete button click
                        // from triggering parent (and routing to /route)
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      <small className="text-muted">
                        {moment(route.created).format("LL")}
                      </small>
                      <Popover
                        className="close pull-right"
                        aria-label="Close"
                        interactionKind={PopoverInteractionKind.CLICK}
                        popoverClassName="bp3-popover-content-sizing"
                        position={Position.RIGHT}
                      >
                        <button type="button" className="close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <div key="text">
                          <p>
                            Are you sure you want to delete these items? You
                            won't be able to recover them.
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginTop: 15,
                            }}
                          >
                            <Button
                              className={Classes.POPOVER_DISMISS}
                              style={{ marginRight: 10 }}
                            >
                              Cancel
                            </Button>
                            <Button
                              intent={Intent.DANGER}
                              className={Classes.POPOVER_DISMISS}
                              onClick={() => this.deleteRoute(index)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Popover>
                      {/* <button
                        onClick={(e) => this.deleteRoute(e, index)}
                        type="button"
                        className="close pull-right"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button> */}
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
        <div id="routes" className="mx-auto w-80 mt-n4 mt-md-0 ">
          {this.routes()}
        </div>
        <Fab
          id="fab"
          className="btn-teal"
          aria-label="add"
          onClick={() => this.props.history.push("/")}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withAuth(Routes);
