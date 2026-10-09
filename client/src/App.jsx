import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";
import "./App.css";

const API_URL = "http://localhost:5000/api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMovies() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Could not load movies");
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase()) ||
    movie.genre.toLowerCase().includes(search.toLowerCase()) ||
    movie.director.toLowerCase().includes(search.toLowerCase())
  );

  async function deleteMovie(id) {
    const ok = window.confirm("Delete this movie?");
    if (!ok) return;

    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.ok) {
      setSelectedMovie(null);
      loadMovies();
    }
  }

  function startEdit(movie) {
    setEditingMovie(movie);
    setShowForm(true);
    setSelectedMovie(null);
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1>MovieHub</h1>
        <div className="nav-actions">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
          />
          <button onClick={() => { setEditingMovie(null); setShowForm(true); }}>
            + Add Movie
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">REACT + EXPRESS + MONGODB</p>
            <h2>Unlimited movies, built from scratch.</h2>
            <p>MovieHub reads movie data from MongoDB through an Express API.</p>
          </div>
        </section>

        {error && <p className="error">{error}</p>}
        {loading ? <p className="status">Loading movies...</p> : null}

        <section className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </section>
      </main>

      {selectedMovie && (
        <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedMovie.bannerUrl} alt={selectedMovie.name} />
            <h2>{selectedMovie.name}</h2>
            <p>{selectedMovie.description}</p>
            <p><b>Genre:</b> {selectedMovie.genre}</p>
            <p><b>Director:</b> {selectedMovie.director}</p>
            <p><b>Cast:</b> {selectedMovie.cast}</p>
            <div className="modal-actions">
              <button onClick={() => startEdit(selectedMovie)}>Edit</button>
              <button className="danger" onClick={() => deleteMovie(selectedMovie._id)}>Delete</button>
              <button onClick={() => setSelectedMovie(null)}>Close</button>
            </div>
            <iframe
              title={`${selectedMovie.name} trailer`}
              src={selectedMovie.trailer}
              allowFullScreen
            />
          </div>
        </div>
      )}

      {showForm && (
        <MovieForm
          movie={editingMovie}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); loadMovies(); }}
        />
      )}
    </div>
  );
}

export default App;