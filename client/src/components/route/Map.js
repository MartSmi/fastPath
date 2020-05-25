import React from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places"];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMapWorks(props) {
  const mapContainerStyle = {
    position: "relative",
    top: "5vh",
    left: "4vw",
    height: "75vh",
    width: "68vw",
  };

  const center = {
    lat: props.lat || 54.687157,
    lng: props.lng || 25.279652,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    //    libraries,
  });

  console.log("Map");

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      >
        {props.directions && (
          <DirectionsRenderer directions={props.directions} />
        )}
      </GoogleMap>
    </div>
  );
}
