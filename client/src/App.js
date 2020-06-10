import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import AddressForm from "./components/address_form/Form";
import RouteMap from "./route/Route";
import SignIn from "./components/signIn/SignIn";
import Routes from "./components/routes/Routes";
import AuthHelperMethods from "./components/auth/AuthHelperMethods";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleRouteDataResponse = this.handleRouteDataResponse.bind(this);
    this.state = {
      loggedIn: this.Auth.loggedIn(),
      routes: [],
      selectedRoute: null,
    };
  }
  Auth = new AuthHelperMethods();
  /* Add the following into _handleLogout*/
  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/");
  };

  handleLogin = () => {
    this.setState({ loggedIn: this.Auth.loggedIn() });
  };

  handleRouteDataResponse(data) {
    console.log(data);

    localStorage.setItem("routeData", JSON.stringify(data.route));
    this.setState({ routeData: data.route });
  }

  getRouteData() {
    console.log(this.state.selectedRoute);

    if (this.state.selectedRoute !== null) {
      return this.state.selectedRoute;
    }
    if (this.state.routeData === undefined) {
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
          <Header loggedIn={this.state.loggedIn} />
          <Route
            render={(props) => (
              <SignIn {...props} handleLogin={this.handleLogin} />
            )}
          ></Route>
          <Switch>
            <Route
              path="/route"
              render={(props) => (
                <RouteMap
                  {...props}
                  routeData={this.getRouteData()}
                  loggedIn={this.state.loggedIn}
                />
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
            <Route
              exact
              path="/routes"
              render={(props) => (
                <Routes {...props} viewRoute={this.handleRouteDataResponse} />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
