import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "c200a8fcfcfad0023da3960702bcfa85";

  const searchWeather = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchWeather();
    }
  };

  const convertToCelsius = (temp) => {
    if (typeof temp === "number") {
      return `${(temp - 273.15).toFixed(2)}°C`;
    }
    return "Invalid temperature";
  };

  return (
    <div className="App">
      <div className="weather-container">
        <input
          className="weather-input"
          type="text"
          placeholder="도시를 입력해주세요."
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {weatherData && (
          <div className="weather-info">
            <p className="city-name">{weatherData.name}</p>
            <p className="city-temp">
              {convertToCelsius(weatherData.main.temp)}
            </p>
            <p className="city-weather">{weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
