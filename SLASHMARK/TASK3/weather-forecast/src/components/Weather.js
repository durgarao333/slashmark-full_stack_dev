// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const getWeatherData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/weather?location=${location}`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <h1>Weather Forecast App</h1>
            <label htmlFor="location">Enter Location:</label>
            <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={getWeatherData}>Get Forecast</button>

            {weatherData && (
                <div>
                    <h2>Weather Forecast for {weatherData.city.name}</h2>
                    {/* Display forecast data for the next 5 days */}
                    <ul>
                        {weatherData.list.map((forecast, index) => (
                            <li key={index}>
                                {forecast.dt_txt}: {forecast.weather[0].description}, {forecast.main.temp}°C
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Weather;
