import React from "react";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";

import MovieItem from "./MoviesItem";

const MoviesList = ({ movies }) => {
  const renderMovie = movie => (
    <MovieItem key={movie.id} movie={movie}></MovieItem>
  );

  return <ScrollView>{movies.map(renderMovie)}</ScrollView>;
};

MoviesList.propTypes = {
  movies: PropTypes.array
};

export default MoviesList;
