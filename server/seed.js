import mongoose from "mongoose";
import Movie from "./models/Movie.js";
import movies_data from "./moviehub_movies_data.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/devt";

async function seedMovies() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await Movie.deleteMany({});
    console.log("Old movie records removed");

    // The source data has a numeric id. MongoDB/Mongoose will create its own _id.
    const movies = movies_data.map(({ id, ...movie }) => movie);

    await Movie.insertMany(movies);
    console.log(`${movies.length} movies inserted successfully`);
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedMovies();