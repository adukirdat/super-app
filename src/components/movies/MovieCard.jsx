const MovieCard = ({ movie, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-video overflow-hidden rounded-md bg-[#1F1F1F] text-left shadow-panel transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(114,219,115,0.14)]"
    >
      <img
        src={movie.image}
        alt=""
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
        <p className="truncate text-xs font-semibold text-white">{movie.title}</p>
      </div>
    </button>
  );
};

export default MovieCard;
