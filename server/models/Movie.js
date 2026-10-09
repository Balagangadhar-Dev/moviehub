import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  rating: { type: String, required: true },
  duration: { type: String, required: true },
  director: { type: String, required: true },
  cast: { type: String, required: true },
  description: { type: String, required: true },
  bannerUrl: { type: String, required: true },
  trailer: { type: String, required: true }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;