import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import AddressForm from "./components/address_form/Form";
import RouteMap from "./components/route/Route";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleRouteDataResponse = this.handleRouteDataResponse.bind(this);
    this.state = {
      user: {},
    };
  }

  handleRouteDataResponse(data) {
    localStorage.setItem("routeData", JSON.stringify(data));
    this.setState({ routeData: data });
  }

  getRouteData() {
    if (this.state.routeData == undefined) {
      console.log("undefined routeData");
      console.log(localStorage.getItem("routeData"));
      let item = localStorage.getItem("routeData");
      return JSON.parse(item);
    } else {
      return this.state.routeData;
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route
              path="/route"
              render={(props) => (
                <RouteMap {...props} routeData={this.getRouteData()} />
              )}
            ></Route>
            <Route
              exact
              path="/"
              render={(props) => (
                <AddressForm
                  {...props}
                  onRouteDataResponse={this.handleRouteDataResponse}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
