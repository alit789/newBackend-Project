// models/movieModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Genre = require("./genreModel");

const Movie = sequelize.define(
  "Movie",
  {
    adult: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vote_average: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    popularity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Movie.belongsToMany(Genre, { through: "MovieGenre" });
Genre.belongsToMany(Movie, { through: "MovieGenre" });

module.exports = Movie;
