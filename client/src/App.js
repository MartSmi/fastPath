import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import AddressForm from "./components/address_form/Form";
import Course from "./components/route/Route";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/route">
            <Course />
          </Route>
          <Route exact path="/">
            <AddressForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
