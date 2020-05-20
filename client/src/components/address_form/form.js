import React, { Component } from "react";
import Checkpoint from "../checkpoint/checkpoint";
import "./form.css";
import Grid from '@material-ui/core/Grid'
import PlacesAutocomplete from "react-places-autocomplete";

class Form extends Component {
  state = {
    start: "",
    checkpoints: ["", ""],
    end: "",
  };
  //Places autocomplete
  changeCheckpoint = (address, index) => {
    console.log(address, index);
    let checkpoints = this.state.checkpoints;
    checkpoints[index] = address;
    this.setState({ checkpoints });
  };

  changeStart(e) {
    this.setState({ start: e.target.value });
  }

  changeEnd(e) {
    this.setState({ end: e.target.value });
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
        {
          this.state.checkpoints.map((address, index) => {
            return (
              <div key={index}>
                <PlacesAutocomplete
                  value={address}
                  onChange={(address) => {this.changeCheckpoint(address, index)}}
                  onSelect={this.handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input",
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: "#fafafa", cursor: "pointer" }
                              : { backgroundColor: "#ffffff", cursor: "pointer" };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
              </div>
            )
          })
        }
        {
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
        </form> }

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
