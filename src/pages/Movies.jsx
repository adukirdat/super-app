import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';
import { getMovieDetails, getMoviesByCategories } from '../services/movieService';
import MovieCard from '../components/movies/MovieCard';
import MovieModal from '../components/movies/MovieModal';

const Movies = () => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);
  const [movieGroups, setMovieGroups] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const detailControllerRef = useRef(null);

  const categoryKey = useMemo(
    () => selectedCategories.map((category) => category.title).sort().join('|'),
    [selectedCategories],
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setStatus('loading');
        setErrorMessage('');
        const data = await getMoviesByCategories({
          categories: selectedCategories,
          signal: controller.signal,
        });
        setMovieGroups(data);
        setStatus('success');
      } catch (error) {
        if (axios.isCancel(error) || error.name === 'CanceledError') return;
        setMovieGroups([]);
        setErrorMessage(error.message || 'Unable to load movies right now.');
        setStatus('error');
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [categoryKey, selectedCategories]);

  useEffect(() => {
    return () => detailControllerRef.current?.abort();
  }, []);

  const handleMovieClick = useCallback(async (movie, category) => {
    detailControllerRef.current?.abort();
    const controller = new AbortController();
    detailControllerRef.current = controller;

    const basicMovie = { ...movie, category: category.category, detailsLoading: true };
    setSelectedMovie(basicMovie);

    try {
      const detailedMovie = await getMovieDetails({
        movie: basicMovie,
        signal: controller.signal,
      });
      setSelectedMovie(detailedMovie);
    } catch (error) {
      if (axios.isCancel(error) || error.name === 'CanceledError') return;
      setSelectedMovie({
        ...basicMovie,
        detailsLoading: false,
        detailsError: 'More movie details are unavailable right now.',
      });
    }
  }, []);

  const handleCloseModal = () => {
    detailControllerRef.current?.abort();
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[1040px] px-5 py-7 sm:px-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="text-xl font-bold text-[#72DB73]">Super app</div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#72DB73] bg-[#5746EA]">
            <span className="text-sm font-bold text-white">
              {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
        </div>

        <h1 className="mb-5 text-sm font-semibold text-white">Entertainment according to your choice</h1>

        {status === 'loading' && (
          <div className="app-panel py-12 text-center text-sm text-white/70">
            <p>Loading movies for your selected categories...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="app-panel py-12 text-center text-sm text-white/70">
            <p>{errorMessage}</p>
          </div>
        )}

        {status === 'success' && movieGroups.map((category) => (
          <section key={category.category} className="mb-6">
            <h2 className="mb-3 text-sm font-medium text-white/85">{category.category}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {category.movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie, category)}
                />
              ))}
            </div>
          </section>
        ))}

        {status === 'success' && movieGroups.length === 0 && (
          <div className="app-panel py-12 text-center text-sm text-white/70">
            <p>No categories selected. Please select categories to see movie recommendations.</p>
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Movies;
