import React, { Component } from "react";

class Checkpoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "checkpoint" + this.props.index,
    };
  }
  render() {
    return (
      <div>
        <input
          type="text"
          className="form-control checkpoint"
          id="checkpoint"
          name={this.state.name}
          placeholder="Address"
          onChange={this.props.onChange}
          value={this.props.address}
        />
        {(() => {
          if (this.props.index !== 0) {
            return (
              <button type="button" onClick={this.props.remove}>
                Remove
              </button>
            );
          }
        })()}
      </div>
    );
  }
}
export default Checkpoint;
