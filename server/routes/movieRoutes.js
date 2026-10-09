import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// GET /api/movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ releaseYear: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/movies/:id
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: "Invalid movie id" });
  }
});

// POST /api/movies
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/movies/:id
router.put("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/movies/:id
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid movie id" });
  }
});

export default router;