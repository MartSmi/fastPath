import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthHelperMethods from "../auth/AuthHelperMethods";

export default class Header extends Component {
  Auth = new AuthHelperMethods();

  render() {
    const accountButton = () => {
      if (this.props.loggedIn) {
        return (
          <div className="text-center">
            <a
              href="/#"
              className="btn btn-default btn-rounded"
              onClick={this.Auth.logout}
            >
              <i className="fas fa-sign-out-alt"></i>
            </a>
          </div>
        );
      } else {
        return (
          <div className="text-center">
            <a
              id="loginAccount"
              href="/#"
              className="btn btn-default btn-rounded"
              data-toggle="modal"
              data-target="#modalLRForm"
            >
              <i className="fas fa-user mr-1" />
            </a>
          </div>
        );
      }
    };
    const myRoutes = () => {
      if (this.props.loggedIn) {
        return (
          <li className="nav-item">
            <Link className="nav-link" to="./routes">
              My Routes
            </Link>
          </li>
        );
      }
    };
    return (
      <header>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">
            FastPath
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item active">
              <a className="nav-link" href="#">
                Main
              </a>
            </li> */}
              {myRoutes()}
            </ul>
          </div>
          <div className="accountButton">{accountButton()}</div>
        </nav>
      </header>
    );
  }
}
