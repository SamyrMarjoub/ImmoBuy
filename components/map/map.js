import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import style from '../../styles/Home.module.css'
import { useEffect, useState } from 'react'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import {BsFillHouseFill} from 'react-icons/bs'
import L from 'leaflet';

function Map({ datas, latitude, longitude }) {
    const [markets, setMarkets] = useState([])

    function tratardata() {
        const imovelDataWithConcatenation = datas.map((item) => ({
            ...item,
            position: [item.latitude, item.longitude],

        }));
        setMarkets(imovelDataWithConcatenation)
    }

    // const CustomMarkerIcon = () => {
    //     return (
    //       <div>
    //         <BsFillHouseFill size={30} color="red" />
    //       </div>
    //     );
    //   };

    useEffect(() => {
        // console.log(datas)
        tratardata()
    }, [])
    return (
        <MapContainer className={style.map} center={[latitude, longitude]} zoom={16} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >
            </TileLayer>
            {markets.map((marker) => (
                <Marker key={marker.id} position={marker.position}>
                    <Popup>{marker.text}</Popup>
                </Marker>
            ))}
        </MapContainer >
    )
}

export default Map