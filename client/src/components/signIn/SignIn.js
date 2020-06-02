import React from "react";
import "./signIn.css";

export default function SignIn() {
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
                  <div className="modal-body text-left">
                    <fieldset className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="bmd-label-floating"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                      />
                      <span className="bmd-help">
                        We'll never share your email with anyone else.
                      </span>
                    </fieldset>

                    <fieldset className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="bmd-label-floating"
                      >
                        Password
                      </label>
                      <input type="password" className="form-control" />
                    </fieldset>
                    <div className="text-center mb-3">
                      <button
                        type="button"
                        className="btn btn-teal btn-rounded btn-block"
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="row my-3 d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-white btn-rounded mr-md-3 z-depth-1a"
                      >
                        <i className="fab fa-facebook-f text-center" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-white btn-rounded mr-md-3 z-depth-1a"
                      >
                        <i className="fab fa-twitter" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-white btn-rounded z-depth-1a"
                      >
                        <i className="fab fa-google-plus-g" />
                      </button>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-teal ml-auto"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
                <div className="tab-pane fade" id="panel8" role="tabpanel">
                  <div className="modal-body text-left">
                    <fieldset className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="bmd-label-floating"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                      />
                      <span className="bmd-help">
                        We'll never share your email with anyone else.
                      </span>
                    </fieldset>

                    <fieldset className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="bmd-label-floating"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="bmd-label-floating"
                      >
                        Repeat password
                      </label>
                      <input
                        type="password_repeat"
                        className="form-control"
                        id="exampleInputEmail1"
                      />
                    </fieldset>
                    <div className="text-center mb-3">
                      <button
                        type="button"
                        className="btn btn-teal btn-rounded btn-block"
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="row my-3 d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-white btn-rounded mr-md-3 z-depth-1a"
                      >
                        <i className="fab fa-facebook-f text-center" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-white btn-rounded mr-md-3 z-depth-1a"
                      >
                        <i className="fab fa-twitter" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-white btn-rounded z-depth-1a"
                      >
                        <i className="fab fa-google-plus-g" />
                      </button>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
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
