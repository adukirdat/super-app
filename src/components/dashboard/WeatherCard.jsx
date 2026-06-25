import { useEffect, useState } from 'react';
import axios from 'axios';
import { getWeatherData } from '../../services/weatherService';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        setStatus('loading');
        const data = await getWeatherData({ signal: controller.signal });
        setWeather(data);
        setStatus('success');
      } catch (error) {
        if (axios.isCancel(error) || error.name === 'CanceledError') return;
        setStatus('error');
      }
    };

    fetchWeather();

    return () => controller.abort();
  }, []);

  const date = new Intl.DateTimeFormat('en-GB').format(new Date()).replace(/\//g, '-');
  const time = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());

  return (
    <div className="app-panel overflow-hidden bg-[#101744]">
      <div className="grid grid-cols-2 bg-[#FF4ADE] px-5 py-2 text-center text-lg font-bold text-white">
        <span>{date}</span>
        <span>{time}</span>
      </div>

      <div className="grid grid-cols-3 items-center divide-x divide-white/25 px-5 py-4 text-white">
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl leading-none">☔</span>
          <p className="text-xs">{status === 'loading' ? 'Loading...' : status === 'error' ? 'Weather unavailable' : weather.condition}</p>
        </div>

        <div className="px-4 text-center">
          <p className="text-3xl font-medium leading-none">{status === 'success' ? `${weather.temperature}°C` : '--°C'}</p>
          <p className="mt-2 text-[11px] text-white/80">{status === 'success' ? weather.pressure : '--'} mbar<br />Pressure</p>
        </div>

        <div className="space-y-3 pl-4 text-[11px] text-white/85">
          <p>{status === 'success' ? `${weather.windSpeed} m/s` : '--'}<br />Wind</p>
          <p>{status === 'success' ? `${weather.humidity}%` : '--'}<br />Humidity</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
