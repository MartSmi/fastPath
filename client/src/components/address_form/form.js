import React, { Component } from "react";
import Checkpoint from "../checkpoint/checkpoint";
import "./form.css";

class Form extends Component {
  state = {
    start: "",
    checkpoints: [""],
    end: "",
  };

  changeStart(e) {
    this.setState({ start: e.target.value });
  }

  changeEnd(e) {
    this.setState({ end: e.target.value });
  }

  changeCheckpoint(e, index) {
    let tmp = this.state.checkpoints;
    tmp[index] = e.target.value;
    this.setState({ checkpoints: tmp });
  }

  handleRemove(index) {
    this.state.checkpoints.splice(index, 1);
    console.log(this.state.checkpoints, "$$");
    this.setState({ checkpoints: this.state.checkpoints });
  }

  handleSubmit(event) {
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

  addCheckpoint() {
    // State change will cause component re-render
    this.setState({
      checkpoints: [...this.state.checkpoints, ""],
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <div className="form-group">
            <label htmlFor="start">Start</label>
            <input
              type="text"
              className="form-control"
              id="start"
              name="start"
              placeholder="Address"
              onChange={(e) => {
                this.changeStart(e);
              }}
            />
          </div>
          <div id="checkpoints" className="form-group">
            <label htmlFor="checkpoint0">Checkpoint</label>
            {this.state.checkpoints.map((address, index) => {
              return (
                <div key={index}>
                  <Checkpoint
                    address={address}
                    index={index}
                    onChange={(e) => {
                      this.changeCheckpoint(e, index);
                    }}
                    remove={(e) => {
                      this.handleRemove(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="form-group">
            <label htmlFor="finish">Finish</label>
            <input
              type="text"
              className="form-control"
              id="finish"
              name="finish"
              placeholder="Address"
              onChange={(e) => {
                this.changeEnd(e);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <button
          type="button"
          onClick={(e) => {
            this.addCheckpoint(e);
          }}
        >
          Add
        </button>
      </div>
    );
  }
}
export default Form;
