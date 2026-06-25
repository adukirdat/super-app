import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const TMDB_GENRES = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Music: 10402,
  Sports: 99,
  Thriller: 53,
  Fantasy: 14,
  Romance: 10749,
};

const assertTmdbKey = () => {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB API key is missing.');
  }
};

const normalizeMovie = (movie, category) => ({
  id: movie.id,
  title: movie.title || movie.name || 'Untitled',
  year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
  rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
  runtime: movie.runtime || null,
  genres: movie.genres?.map((genre) => genre.name).join(', ') || movie.genre || category,
  cast: movie.credits?.cast?.slice(0, 5).map((member) => member.name).join(', ') || movie.cast || 'Cast unavailable',
  description: movie.overview || 'No description is available for this movie.',
  image: movie.backdrop_path
    ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}`
    : movie.poster_path
      ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
      : 'https://picsum.photos/seed/super-movie-fallback/520/292',
  poster: movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : movie.backdrop_path
      ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}`
      : 'https://picsum.photos/seed/super-movie-poster-fallback/520/760',
  category,
});

export const getMoviesByCategories = async ({ categories, signal } = {}) => {
  assertTmdbKey();

  const selectedCategories = categories.filter((category) => TMDB_GENRES[category.title]);

  if (!selectedCategories.length) {
    return [];
  }

  const categoryResults = await Promise.all(
    selectedCategories.map(async (category) => {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        signal,
        params: {
          api_key: TMDB_API_KEY,
          with_genres: TMDB_GENRES[category.title],
          sort_by: 'popularity.desc',
          include_adult: false,
          page: 1,
        },
      });

      const movies = (response.data?.results || [])
        .slice(0, 4)
        .map((movie) => normalizeMovie(movie, category.title));

      return {
        category: category.title,
        movies,
      };
    }),
  );

  const populatedResults = categoryResults.filter((group) => group.movies.length);

  if (!populatedResults.length) {
    throw new Error('No movies found for your selected categories.');
  }

  return populatedResults;
};

export const getMovieDetails = async ({ movie, signal }) => {
  assertTmdbKey();

  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
    signal,
    params: {
      api_key: TMDB_API_KEY,
      append_to_response: 'credits',
    },
  });

  return normalizeMovie({ ...movie, ...response.data }, movie.category);
};
