# Super App

A React + Vite frontend assignment that combines registration, category onboarding, a personalized dashboard, weather, news, notes, timer, and dynamic movie recommendations.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Zustand
- React Router DOM
- Axios

## Features

- Validated registration form for name, username, email, and mobile number.
- Category onboarding with a minimum 3-category gate.
- Protected routes for onboarding, dashboard, and movies flow.
- Dashboard with profile, live weather, rotating news, notes, and countdown timer.
- Notes autosave to browser storage and restore on refresh.
- Live OpenWeatherMap integration.
- Live GNews or NewsAPI integration with 2-second headline rotation.
- TMDB movie recommendations based on selected categories.
- Movie detail modal with poster, title, genre, rating, runtime, cast, and description.
- Zustand persistence for user, categories, notes, and dashboard flow state.

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_key
VITE_WEATHER_CITY=Delhi

VITE_GNEWS_API_KEY=your_gnews_key
# Or use NewsAPI instead:
# VITE_NEWS_API_KEY=your_newsapi_key

VITE_TMDB_API_KEY=your_tmdb_key
```

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Deploy the project on Vercel or Netlify and add the same environment variables in the hosting provider dashboard.

## Notes

NewsAPI may have browser/CORS limitations on some plans. GNews is supported through `VITE_GNEWS_API_KEY` and is preferred for browser-only deployment.
