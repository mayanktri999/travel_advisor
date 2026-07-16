import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [coords, setCoords] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi fallback
  const [bounds, setBounds] = useState(null);
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      },
      () => {
        // Geolocation denied — keep Delhi fallback
      }
    );
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={4} style={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <List
            places={places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Map
            coords={coords}
            places={places}
            setCoords={setCoords}
            setBounds={setBounds}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;