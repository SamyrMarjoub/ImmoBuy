import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript, StandaloneSearchBox, LoadScript, MarkerF } from '@react-google-maps/api';
import { Input, Box } from '@chakra-ui/react';

const libraries = ['places'];

function Map({ datas, latitude, longitude }) {
  const [markets, setMarkets] = useState([]);
  const [searchBox, setSearchBox] = useState('');
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAs8wOkvrYc7OhH6OvZslS3H14MwNwS-uw',
    libraries: libraries
  });
  const [map, setMap] = useState(null);
  const [newMarkers, setNewMarkers] = useState([]);
  const [chosenLocation, setChosenLocation] = useState(null); 
  const [mapCenter, setMapCenter] = useState({
    lat: latitude,
    lng: longitude  
  });
  function tratardata() {
    const imovelDataWithConcatenation = datas.map((item) => ({
      ...item,
      position: {
        lat: item.latitude,
        lng: item.longitude,
      },
    }));
    setMarkets(imovelDataWithConcatenation);
    console.log(imovelDataWithConcatenation);
  }

  const onMapLoad = (map) => {
    setMap(map);

    // Centra no estado atual, não na props inicial
    map.setCenter(mapCenter);
  
    if(chosenLocation) {
      map.panTo(chosenLocation); 
    }
  };

  const onLoadA = (ref) => {
    setSearchBox(ref);
  };

  function setMapView(location) {
    if (map) {
      map.setCenter(location);
    }
  }

  const onPlacesChanged = () => {
    try {
      const places = searchBox.getPlaces();
      console.log(places)

      if (places && places.length > 0) {
        const place = places[0];
        const location = {
          lat: place?.geometry?.location?.lat() || 0,
          lng: place?.geometry?.location?.lng() || 0,
        };
        setMapCenter(location);
        setNewMarkers(prev => [...prev, location]);
        
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    tratardata();
  }, []);

  useEffect(() => {
    console.log(markets);
  }, [markets]);

  return isLoaded ? (
    <GoogleMap
      center={mapCenter}
      zoom={17}
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onLoad={onMapLoad}
    >
      {markets.map((market, index) => (
        <MarkerF
          key={index}
          position={{ lat: market.position.lat, lng: market.position.lng }}
        />
      ))}

      {newMarkers.map((market, index) => ( 
        <Marker key={index} position={{ lat: market.lat, lng: market.lng }} />
      ))}

      <Box left={'40%'} w={'400px'} bg='white' top={'20px'} height={'40px'} position={'absolute'}>
        <StandaloneSearchBox
          onLoad={onLoadA}
          onPlacesChanged={onPlacesChanged}
        >
          <Input
            style={{ width: '100%', height: '40px', color: 'black' }}
            placeholder="Digite o endereço inicial"
            autoComplete='off'
          />
        </StandaloneSearchBox>
      </Box>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;