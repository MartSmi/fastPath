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
      routeData: [],
    };
  }

  handleRouteDataResponse(data) {
    this.setState({ routeData: data });
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
                <RouteMap {...props} routeData={this.state.routeData} />
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
