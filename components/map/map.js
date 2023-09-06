import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import style from '../../styles/Home.module.css'
// import React, { useState, useEffect } from 'react'
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function Map({latitude, longitude}) {
    return (
        <MapContainer className={style.map} center={[latitude, longitude]} zoom={16} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >


            </TileLayer>
        </MapContainer >
    )
}

export default Map