# Super App

A modern React + Vite dashboard application that combines entertainment, productivity, and live information into a single personalized experience.

## Live Demo

Add Vercel URL here

## Features

- User Registration with validation
- Category Selection with a minimum of 3 categories
- Protected Routes
- User Dashboard
- Live Weather
- Live News with auto refresh every 2 seconds
- Notes with LocalStorage persistence
- Countdown Timer
- TMDB Movie Recommendations
- Movie Details Modal
- Zustand State Management


## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| State Management | Zustand |
| Routing | React Router DOM |
| HTTP | Axios |
| APIs | OpenWeatherMap, GNews, TMDB |

## Folder Structure

```text
super-app/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── categories/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── movies/
│   │   └── registration/
│   ├── data/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Environment Variables

Create a `.env` file in the project root and add the following values:

| Variable | Description |
| --- | --- |
| `VITE_OPENWEATHER_API_KEY` | OpenWeatherMap API key |
| `VITE_WEATHER_CITY` | Default city for weather data |
| `VITE_GNEWS_API_KEY` | GNews API key |
| `VITE_TMDB_API_KEY` | TMDB API key |

Example:

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_key
VITE_WEATHER_CITY=Delhi
VITE_GNEWS_API_KEY=your_gnews_key
VITE_TMDB_API_KEY=your_tmdb_key
```

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Assignment Flow

```text
Registration
↓
Category Selection
↓
Dashboard
↓
Movies
```

## Future Improvements

- Authentication backend
- Favorites
- Search
- Dark/Light theme
- PWA support

## Author

**Aditya Kirdat**

B.Tech Computer Engineering

GitHub: placeholder

LinkedIn: placeholder
