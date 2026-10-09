import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/moviehub";

app.use(
  cors({
    origin: "http://localhost:5175",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "MovieHub API is running" });
});

app.use("/api/movies", movieRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });