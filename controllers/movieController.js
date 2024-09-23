const Movie = require("../models/movieModel");
const Genre = require("../models/genreModel");
const { Op } = require("sequelize");

// Create Movie
exports.addMovie = async (req, res) => {
  const { genres, ...movieData } = req.body;
  try {
    // Create the movie record
    const movie = await Movie.create(movieData);

    // Find or create genre instances
    const genreInstances = await Promise.all(
      genres.map(async (genreName) => {
        let [genre] = await Genre.findOrCreate({
          where: { name: genreName },
          defaults: { name: genreName },
        });
        return genre;
      })
    );

    // Associate genres with the movie
    await movie.addGenres(genreInstances);

    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error });
  }
};

// Get All Movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: {
        model: Genre,
        attributes: ["id", "name"], // Only include relevant fields
      },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving movies", error });
  }
};

// Get Movie By ID
exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["id", "name"], // Only include relevant fields
      },
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving movie", error });
  }
};

// Update Movie
exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { genres, ...movieData } = req.body;
  try {
    const [updated] = await Movie.update(movieData, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Movie not found" });

    // Update genres
    const movie = await Movie.findByPk(id);
    const genreInstances = await Promise.all(
      genres.map(async (genreName) => {
        let [genre] = await Genre.findOrCreate({
          where: { name: genreName },
          defaults: { name: genreName },
        });
        return genre;
      })
    );
    await movie.setGenres(genreInstances);

    res.json({ message: "Movie updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};

// Delete Movie
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Movie.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};

// Get Movies By Genre
exports.getMoviesByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const movies = await Movie.findAll({
      include: {
        model: Genre,
        where: { name: genre },
        attributes: ["id", "name"], // Only include relevant fields
      },
    });

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found for this genre" });
    }

    res.json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving movies by genre", error });
  }
};
