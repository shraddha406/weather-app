import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // Placeholder API endpoint (use a real API endpoint in production)
  const PLACEHOLDER_API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts/1'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!city.trim()) {
      setError('City name cannot be empty.');
      return;
    }

    try {
      // Fetch weather data from placeholder API
      const response = await axios.get(PLACEHOLDER_API_ENDPOINT);

      // Simulate weather data based on the mock response
      setWeather({
        city: city,
        main: {
          temp: Math.floor(Math.random() * 30) + 1, // Random temperature for demo
          humidity: Math.floor(Math.random() * 100) // Random humidity for demo
        },
        weather: [
          {
            description: 'Clear sky', // Static description for demo
            icon: '01d' // Static icon for demo
          }
        ],
        wind: {
          speed: Math.floor(Math.random() * 10) // Random wind speed for demo
        }
      });
    } catch (err) {
      setError('Error fetching data. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button
          type="submit"
          disabled={!city.trim()} // Disable button if input is empty
        >
          Fetch Weather
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <p className="temperature">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
