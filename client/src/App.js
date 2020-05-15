import React from "react";
import "./App.css";
import Addresses_form from "./components/address_form/form";

function App() {
  return (
    <div className="App">
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <a class="navbar-brand" href="#">
            FastPath
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Main
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./about.html">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./contacts.html">
                  Contacts
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Addresses_form />
    </div>
  );
}

export default App;
