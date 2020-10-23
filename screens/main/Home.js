import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { addHeaderLeftNavigator } from "../../helpers";
import { getMovies } from "../../store/actions/MovieActions";
import { makeSelectMoviesList } from "../../store/selectors/MoviesSelector";
import MoviesList from "../../components/movies/MoviesList";

const Home = () => {
  navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderLeftNavigator(navigation);
    return { ...headerLeftNav, title: "Home" };
  };

  const dispatch = useDispatch();

  const handleMoviesGet = data => dispatch(getMovies(data));

  const movies = useSelector(makeSelectMoviesList());

  useEffect(() => {
    //handleMoviesGet();
  }, []);

  return (
    <View style={styles.container}>
      <MoviesList movies={movies}></MoviesList>
    </View>
  );
};

Home.propTypes = {};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
