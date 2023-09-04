import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import style from '../../styles/Home.module.css'
// import React, { useState, useEffect } from 'react'

function Map({latitude, longitude}) {
    return (
        <MapContainer className={style.map} center={[latitude, longitude]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >


            </TileLayer>
        </MapContainer >
    )
}

export default Map