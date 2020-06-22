import React, { Component } from 'react';
import './route.css';
import Map from './Map';
import RouteBoard from './RouteBoard';
import AuthHelperMethods from '../auth/AuthHelperMethods';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import { withScriptjs } from 'react-google-maps';

class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedAddress: null,
    };
    this.handleAddressClick = this.handleAddressClick.bind(this);
  }

  refHandlers = {
    toaster: ref => (this.toaster = ref),
  };

  Auth = new AuthHelperMethods();

  handleAddressClick(index) {
    this.setState({ markedAddress: index });
  }

  addToast = (message, intent, icon) => {
    this.toaster.show({
      message,
      intent: intent || Intent.SUCCESS,
      icon: icon || 'tick',
      timeout: 1500,
    });
  };

  saveRoute(e) {
    if (this.Auth.loggedIn()) {
      const token = this.Auth.getToken();
      fetch('/api/route/save', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(this.props.routeData),
      })
        .then(response => {
          // this.props.result = result;
          if (response.status === 200) {
            this.addToast('Saved!');
            return response.json();
          } else {
            throw new Error('Bad response: ' + response);
          }
        })
        .catch(error => console.log(error));
    } else {
      document.getElementById('loginAccount').click();
      document.getElementById('registerPanel').click();
    }
  }
  render() {
    const MapWithScript = withScriptjs(Map);
    return (
      <div className="container-fluid">
        <div className="row">
          <div id="mapHolder" className="col-md-8">
            {window.google ? (
              <Map route={this.props.routeData} />
            ) : (
              <MapWithScript
                googleMapURL={
                  'https://maps.googleapis.com/maps/api/js?libraries=places&key=' +
                  process.env.REACT_APP_GOOGLE_API_KEY
                }
                loadingElement={<div style={{ height: `100%` }} />}
                route={this.props.routeData}
              />
            )}
          </div>
          <div className="col-md align-self-center board d-none d-md-block">
            <RouteBoard
              route={this.props.routeData}
              handleAddressClick={this.handleAddressClick}
            />
          </div>
        </div>
        <div id="buttonRow" className="row">
          <div className="col-md-8">
            <div className="row d-flex justify-content-around">
              <div className="col">
                <CopyToClipboard text={this.props.routeData.urlShort}>
                  <button
                    className="btn btn-teal"
                    onClick={() => this.addToast('Copied!')}
                  >
                    Copy Route
                  </button>
                </CopyToClipboard>
              </div>
              <div className="col">
                <button
                  onClick={e => this.saveRoute(e)}
                  className="btn btn-teal"
                >
                  Save route
                </button>
                <Toaster
                  maxToasts={1}
                  position={Position.TOP}
                  ref={this.refHandlers.toaster}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Route;
