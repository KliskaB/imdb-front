import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

const MovieItem = ({ movie }) => (
  <View>
    <Text>{movie.title}</Text>
  </View>
);

MovieItem.propTypes = {
  movie: PropTypes.object
};
export default MovieItem;
