import React, { Component } from "react";
import "./signIn.css";
import AuthHelperMethods from "../auth/AuthHelperMethods";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      registerPassword2: "",
      errors: {},
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  Auth = new AuthHelperMethods();

  onSubmit = (e) => {
    e.preventDefault();
    if (e.target.id === "login") {
      this.Auth.login(this.state.loginEmail, this.state.loginPassword)
        .then((res) => {
          if (res.success === false) {
            return alert("Sorry those credentials don't exist!");
          } else {
            this.props.handleLogin();
            document.getElementById("close").click();
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (e.target.id === "register") {
      const newUser = {
        email: this.state.registerEmail,
        password: this.state.registerPassword,
        password2: this.state.registerPassword2,
      };
      console.log(newUser);

      fetch("/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          if (response.status === 200) {
            document.getElementById("loginPanel").click();
            return response.json();
          } else {
            throw new Error(response);
          }
        })
        .then((data) => {
          // this.props.onRouteDataResponse(data);
          // this.props.history.push("/login");
        })
        .catch((error) => console.log(error));
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div
          className="modal fade"
          id="modalLRForm"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog cascading-modal" role="document">
            <div className="modal-content">
              <div className="modal-c-tabs">
                <ul
                  className="nav nav-tabs md-tabs tabs-2 light-blue darken-3"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      id="loginPanel"
                      className="nav-link active"
                      data-toggle="tab"
                      href="#panel7"
                      role="tab"
                    >
                      <i className="fas fa-user mr-1" />
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      id="registerPanel"
                      className="nav-link"
                      data-toggle="tab"
                      href="#panel8"
                      role="tab"
                    >
                      <i className="fas fa-user-plus mr-1" />
                      Register
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade in show active"
                    id="panel7"
                    role="tabpanel"
                  >
                    <form
                      id="login"
                      noValidate
                      onSubmit={this.onSubmit}
                      className="modal-body text-left"
                    >
                      <fieldset className="form-group">
                        <label
                          htmlFor="loginEmail"
                          className="bmd-label-floating"
                        >
                          Email
                        </label>
                        <input
                          onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          type="email"
                          className="form-control"
                          id="loginEmail"
                        />
                      </fieldset>

                      <fieldset className="form-group">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="bmd-label-floating"
                        >
                          Password
                        </label>
                        <input
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          type="password"
                          id="loginPassword"
                          className="form-control"
                        />
                      </fieldset>
                      <div className="text-center mb-3">
                        <button
                          id="signInButton"
                          type="submit"
                          className="btn btn-teal btn-rounded btn-block"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                    <div className="modal-footer">
                      <button
                        id="close"
                        type="button"
                        className="btn btn-outline-teal ml-auto"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="panel8" role="tabpanel">
                    <form
                      id="register"
                      noValidate
                      onSubmit={this.onSubmit}
                      className="modal-body text-left"
                    >
                      <fieldset className="form-group">
                        <label
                          htmlFor="registerEmail"
                          className="bmd-label-floating"
                        >
                          Email
                        </label>
                        <input
                          onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          type="email"
                          className="form-control"
                          id="registerEmail"
                        />
                      </fieldset>

                      <fieldset className="form-group">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="bmd-label-floating"
                        >
                          Password
                        </label>
                        <input
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          type="password"
                          className="form-control"
                          id="registerPassword"
                        />
                        <span className="bmd-help">
                          Password must be at least 6 characters long
                        </span>
                      </fieldset>
                      <fieldset className="form-group">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="bmd-label-floating"
                        >
                          Confirm Password
                        </label>
                        <input
                          onChange={this.onChange}
                          value={this.state.password2}
                          error={errors.password2}
                          type="password"
                          className="form-control"
                          id="registerPassword2"
                        />
                      </fieldset>
                      <div className="text-center mb-3">
                        <button
                          id="signInButton"
                          type="submit"
                          className="btn btn-teal btn-rounded btn-block"
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                    <div className="modal-footer">
                      <button
                        id="close"
                        type="button"
                        className="btn btn-outline-teal ml-auto"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
