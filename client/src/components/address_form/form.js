import React, { Component } from "react";
import Checkpoint from "../checkpoint/checkpoint";
import "./form.css";

class Form extends Component {
  state = {
    checkpoints: [""],
  };

  handleChange(e, index) {
    this.state.checkpoints[index] = e.target.value;
    this.setState({ checkpoints: this.state.checkpoints });
  }

  handleRemove(index) {
    this.state.checkpoints.splice(index, 1);
    console.log(this.state.checkpoints, "$$");
    this.setState({ checkpoints: this.state.checkpoints });
  }

  handleSubmit(event) {
    console.log("An essay was submitted: " + this.state.checkpoints);
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
                      this.handleChange(e, index);
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
