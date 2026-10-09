import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/movies";

const emptyMovie = {
  name: "",
  genre: "",
  releaseYear: "",
  rating: "",
  duration: "",
  director: "",
  cast: "",
  description: "",
  bannerUrl: "",
  trailer: ""
};

function MovieForm({ movie, onClose, onSaved }) {
  const [form, setForm] = useState(emptyMovie);

  useEffect(() => {
    if (movie) {
      setForm({ ...movie });
    } else {
      setForm(emptyMovie);
    }
  }, [movie]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isEditing = Boolean(movie);
    const url = isEditing ? `${API_URL}/${movie._id}` : API_URL;
    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        releaseYear: Number(form.releaseYear)
      })
    });

    if (response.ok) {
      onSaved();
    } else {
      const data = await response.json();
      alert(data.message || "Could not save movie");
    }
  }

  return (
    <div className="modal-backdrop">
      <form className="form-modal" onSubmit={handleSubmit}>
        <h2>{movie ? "Edit Movie" : "Add Movie"}</h2>

        {Object.keys(emptyMovie).map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            required
          />
        ))}

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="description"
          required
        />

        <div className="modal-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;