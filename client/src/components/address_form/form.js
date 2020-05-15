import React, { Component } from 'react';
import Checkpoint from '../checkpoint/checkpoint';
import './form.css';

class Form extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          newUser: {
            name: '',
            email: '',
            age: '',
            gender: '',
            expertise: '',
            about: ''
    
          },
    
          genderOptions: ['Male', 'Female', 'Others'],
          skillOptions: ['Programming', 'Development', 'Design', 'Testing']
    
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
      }
    
      /* This life cycle hook gets executed when the component mounts */
    
      handleFormSubmit() {
        // Form submission logic
      }
      handleClearForm() {
        // Logic for resetting the form
      }

      addCheckpoint = () => {
        let checkpoint = document.createElement("INPUT");
        let checkpoints = document.getElementsByClassName("checkpoint");
        checkpoint.id = "checkpoint" + (checkpoints.length + 1);
        checkpoint.className = "form-control checkpoint"
        checkpoint.placeholder = "Address "
        checkpoints[0].parentNode.insertBefore(checkpoint, checkpoints[checkpoints.length - 1].nextSibling);
      }
    
      removeCheckpoint = () => {
        let checkpoints = document.getElementsByClassName("checkpoint");
        console.log(checkpoints);
        if (checkpoints.length > 1) {
          document.getElementById(checkpoints[checkpoints.length - 1].id).remove();
        } else {
          alert("You cannot remove the only checkpoint")
        }
      }
    
      render() {
        return (
            <div>
                <form action="/">
                <div className="form-group">
                    <label for="start">Start</label>
                    <input
                    type="text"
                    className="form-control"
                    id="start"
                    name="start"
                    placeholder="Address"
                    />
                </div>
                <Checkpoint number={1}/>
                <div className="form-group">
                    <label for="finish">Finish</label>
                    <input
                    type="text"
                    className="form-control"
                    id="finish"
                    name="finish"
                    placeholder="Address"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <button onclick="addCheckpoint()">Add</button>
                <button onclick="removeCheckpoint()">Remove</button>

            </div>
        );
      }
    }

export default Form;
