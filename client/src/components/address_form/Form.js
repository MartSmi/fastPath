import React, { Component } from "react";
import "./form.css";
import Autocomplete from "../autocomplete/Autocomplete";

class Form extends Component {
  state = {
    start: "",
    checkpoints: ["", ""],
    finish: "",
  };

  changeCheckpoint = (address, index) => {
    console.log(address, index);
    let checkpoints = this.state.checkpoints;
    checkpoints[index] = address;
    this.setState({ checkpoints });
  };

  changeStart(v) {
    this.setState({ start: v });
  }

  changeFinish(v) {
    this.setState({ finish: v });
  }

  handleSubmit(event) {
    console.log(this.state);

    fetch("/api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((result) => result.json())
      .then((info) => {
        console.log(info);
      });
    event.preventDefault();
  }

  removeCheckpoint(index) {
    let checkpoints = this.state.checkpoints;
    checkpoints.splice(index, 1);
    this.setState({ checkpoints });
  }

  addCheckpoint() {
    // State change will cause component re-render
    this.setState({
      checkpoints: [...this.state.checkpoints, ""],
    });
  }

  render() {
    let label_checkpoints;
    if (this.state.checkpoints.length >= 1) {
      label_checkpoints = <label htmlFor="checkpoint0">Checkpoints</label>;
    }

    let button_add = (onClick) => {
      return (
        <button
          type="button"
          className="btn btn-default btn-sm button-add"
          aria-label="Add"
          onClick={onClick}
        >
          <i className="fa fa-plus"></i>
        </button>
      );
    };

    let button_close = (onClick) => {
      return (
        <button
          type="button"
          className="close col-sm-"
          aria-label="Close"
          onClick={onClick}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      );
    };

    let start_part = () => {
      if (this.state.start !== null) {
        return (
          <div className="form-group">
            <label htmlFor="start">Start</label>
            <div className="input-line row">
              <div className="col">
                <Autocomplete
                  placeholder="Start address"
                  onChange={(v) => this.changeStart(v)}
                  value={this.state.start}
                />
              </div>
              {button_close(() => {
                this.changeStart(null);
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div className="form-group">
            {button_add(() => {
              this.changeStart("");
            })}
          </div>
        );
      }
    };

    let finish_part = () => {
      if (this.state.finish !== null) {
        return (
          <div className="form-group">
            <label htmlFor="finish">Finish</label>
            <div className="input-line row">
              <div className="col">
                <Autocomplete
                  placeholder="Finish address"
                  onChange={(v) => this.changeFinish(v)}
                  value={this.state.finish}
                />
              </div>
              {button_close(() => this.changeFinish(null))}
            </div>
          </div>
        );
      } else {
        return (
          <div className="form-group">
            {button_add(() => {
              this.changeFinish("");
            })}
          </div>
        );
      }
    };

    return (
      <div id="form">
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          {start_part()}
          <div id="checkpoints" className="form-group">
            {label_checkpoints}
            {this.state.checkpoints.map((address, index) => {
              return (
                <div key={index} className="input-line row">
                  <div className="checkpoint col">
                    <Autocomplete
                      placeholder="Checkpoint address"
                      onChange={(v) => {
                        console.log(v);
                        this.changeCheckpoint(v, index);
                      }}
                      value={address}
                    />
                  </div>
                  {button_close(() => this.removeCheckpoint(index))}
                </div>
              );
            })}
            {button_add((e) => {
              this.addCheckpoint(e);
            })}
          </div>
          {finish_part()}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
