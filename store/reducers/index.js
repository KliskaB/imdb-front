import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import errorReducer from "./ErrorReducer";
import movieReducer from "./MovieReducer";

export default combineReducers({
  authUser: authReducer,
  error: errorReducer,
  movie: movieReducer
});
