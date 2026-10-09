function MovieCard({ movie, onClick }) {
  return (
    <article className="movie-card" onClick={onClick}>
      <img src={movie.bannerUrl} alt={movie.name} />
      <div className="movie-info">
        <h3>{movie.name}</h3>
        <p>{movie.releaseYear} • {movie.rating} • {movie.duration}</p>
        <p>{movie.genre}</p>
      </div>
    </article>
  );
}

export default MovieCard;