import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import AddressForm from "./components/address_form/Form";
import RouteMap from "./components/route/Route";
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
      routes: [
        {
          origin: "Kaunas",
          waypoints: ["Klaipėda", "Šiauliai"],
          destination: "Vilnius",
        },
        {},
        {},
        {},
        {},
      ],
    };
  }
  Auth = new AuthHelperMethods();
  /* Add the following into _handleLogout*/
  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/");
  };

  handleLogin = () => {
    console.log(this.Auth.loggedIn());
    this.setState({ loggedIn: this.Auth.loggedIn() });
  };

  handleRouteDataResponse(data) {
    localStorage.setItem("routeData", JSON.stringify(data));
    this.setState({ routeData: data });
  }

  getRouteData() {
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
            <Route
              exact
              path="/routes"
              render={(props) => (
                <Routes {...props} routes={this.state.routes} />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
