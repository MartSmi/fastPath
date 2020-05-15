import React, { Component } from "react";

class Checkpoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkpoint_name: "checkpoint" + this.props.number
    };
  }
  render() {
    return (
      <div className="form-group">
        <label for={this.state.checkpoint_name}>Checkpoint</label>
        <input
          type="text"
          className="form-control checkpoint"
          id="checkpoint"
          name={this.state.checkpoint_name}
          placeholder="Address"
        />
      </div>
    );
  }
}
export default Checkpoint;
