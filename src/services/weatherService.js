import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const DEFAULT_CITY = import.meta.env.VITE_WEATHER_CITY || 'Delhi';

export const getWeatherData = async ({ city = DEFAULT_CITY, signal } = {}) => {
  if (!WEATHER_API_KEY) {
    throw new Error('Weather API key is missing.');
  }

  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    signal,
    params: {
      q: city,
      appid: WEATHER_API_KEY,
      units: 'metric',
    },
  });

  const data = response.data;

  if (!data?.main || !data?.weather?.length || !data?.wind) {
    throw new Error('Weather data is unavailable.');
  }

  return {
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    condition: data.weather[0].main,
  };
};
