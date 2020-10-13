import { createSelector } from "reselect";

import reducers from "../reducers";

const selectMoviesDomain = state => state.movie || reducers;

const makeSelectMovies = () =>
  createSelector(selectMoviesDomain, substate => substate);

const makeSelectMoviesList = () =>
  createSelector(selectMoviesDomain, substate => substate.all);

export default makeSelectMovies;

export { makeSelectMoviesList };
