import { useEffect } from 'react';

const MovieModal = ({ movie, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-app bg-[#1F1F1F] shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={movie.poster || movie.image}
            alt={movie.title}
            className="h-72 w-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <h2 className="mb-2 text-2xl font-bold text-white">{movie.title}</h2>
          <div className="mb-4 flex gap-3 text-sm text-white/55">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.category}</span>
            <span>•</span>
            <span>{movie.detailsLoading ? 'Loading rating' : `Rating ${movie.rating ?? 'N/A'}`}</span>
            <span>•</span>
            <span>{movie.detailsLoading ? 'Loading runtime' : movie.runtime ? `${movie.runtime} min` : 'Runtime N/A'}</span>
          </div>
          <div className="mb-4 space-y-1 text-sm text-white/65">
            <p>
              <span className="font-semibold text-white/80">Genre: </span>
              {movie.detailsLoading ? 'Loading genre' : movie.genres || movie.category}
            </p>
            <p>
              <span className="font-semibold text-white/80">Cast: </span>
              {movie.detailsLoading ? 'Loading cast' : movie.cast || 'Cast unavailable'}
            </p>
          </div>
          {movie.detailsError && <p className="mb-3 text-sm text-[#FF6B6B]">{movie.detailsError}</p>}
          <p className="leading-relaxed text-white/75">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
