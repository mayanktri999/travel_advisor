import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Typography, useMediaQuery, Rating, Paper } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { styled } from '@mui/material/styles';

const MapWrapper = styled('div')({
  height: '85vh',
  width: '100%',
});

const StyledPaper = styled(Paper)({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '120px',
});

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const matches = useMediaQuery('(min-width:600px)');

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCA0EuoyQ0zUlwtfyF02-UjxqUG43rAgXY',
  });

  const center = coords && coords.lat !== undefined
    ? { lat: coords.lat, lng: coords.lng }
    : { lat: 0, lng: 0 };

  const onMapLoad = (map) => {
    // nothing needed on load
  };

  const onBoundsChanged = () => {
    // Bounds changes are handled via idle
  };

  const onIdle = (map) => {
    if (!map) return;
    const c = map.getCenter();
    setCoords({ lat: c.lat(), lng: c.lng() });
    const b = map.getBounds();
    if (b) {
      const ne = b.getNorthEast();
      const sw = b.getSouthWest();
      setBounds({
        ne: { lat: ne.lat(), lng: ne.lng() },
        sw: { lat: sw.lat(), lng: sw.lng() },
      });
    }
  };

  if (loadError) {
    return (
      <MapWrapper style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
        <Typography color="error" variant="h6">
          Map failed to load: {loadError.message}
        </Typography>
      </MapWrapper>
    );
  }

  if (!isLoaded) {
    return (
      <MapWrapper style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
        <Typography variant="h6">Loading map…</Typography>
      </MapWrapper>
    );
  }

  return (
    <MapWrapper>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={14}
        onLoad={(map) => {
          map.addListener('idle', () => onIdle(map));
        }}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onClick={(e) => setChildClicked(null)}
      >
        {Array.isArray(places) && places.map((place, i) =>
          place.latitude && place.longitude ? (
            <Marker
              key={i}
              position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
              onClick={() => setChildClicked(i)}
            >
              {matches && (
                <InfoWindow position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}>
                  <StyledPaper elevation={3}>
                    <Typography variant="subtitle2" gutterBottom>{place.name}</Typography>
                    <img
                      style={{ cursor: 'pointer', width: '100%' }}
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                      }
                      alt={place.name}
                    />
                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                  </StyledPaper>
                </InfoWindow>
              )}
            </Marker>
          ) : null
        )}

        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          data.coord && (
            <Marker
              key={`weather-${i}`}
              position={{ lat: data.coord.lat, lng: data.coord.lon }}
              icon={{
                url: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          )
        ))}
      </GoogleMap>
    </MapWrapper>
  );
};

export default Map;