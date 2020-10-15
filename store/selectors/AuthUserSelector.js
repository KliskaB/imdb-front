import { createSelector } from "reselect";
import authReducer from "../reducers/AuthReducer";

const authUserStateSelector = (state) => state.authUser;

export const authUserSelector = createSelector(
  authUserStateSelector,
  (state) => state.authUser
);
