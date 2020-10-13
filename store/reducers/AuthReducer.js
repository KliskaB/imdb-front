import { AUTH_USER } from "../actions/ActionTypes";

const authReducer = (state = false, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
