const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authenticateToken = require("../middleware/authMiddleware");

// All routes will go through authenticateToken middleware
router.post("/movies", authenticateToken, movieController.addMovie);
router.get("/movies", authenticateToken, movieController.getAllMovies);
router.get("/movies/:id", authenticateToken, movieController.getMovieById);
router.put("/movies/:id", authenticateToken, movieController.updateMovie);
router.delete("/movies/:id", authenticateToken, movieController.deleteMovie);
router.get(
  "/movies/genre/:genre",
  authenticateToken,
  movieController.getMoviesByGenre
);

module.exports = router;
