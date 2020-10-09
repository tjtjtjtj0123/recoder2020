import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Circle} from "google-maps-react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import CurrentLocation from "./Map";

export class MapContainer extends Component {
  
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyAYqmb4DLzdfbiki3H4D7lGi6iuqIDV4P4"
        />
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker onClick={this.onMarkerClick} name={"current location"} />
          <Circle 
            center={{lat: 37.66348794177282 , lng: 127.07408851368382}}
            // center={{CurrentLocation}}
            radius={1200}
            fillColor='#FF0000'/>
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}>
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAYqmb4DLzdfbiki3H4D7lGi6iuqIDV4P4",
})(MapContainer);

