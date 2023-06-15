import React from "react"
import { GoogleMap } from "@react-google-maps/api";
/*
This component needs to be wrapped in a Loadscript when used 
*/
export default function Map({userLat,userLon}){
      const mapOptions = {
        center: { lat: userLat, lng: userLon },
        zoom: 8,
        disableDefaultUI: true
      };
    
      return (
        <div className="App">
            <GoogleMap
              mapContainerClassName="map-container"
              defaultOptions={{disableDefaultUI: true, mapTypeControl: false}}
              center={mapOptions.center}
              zoom={13}
            />
        </div>
      );
    };