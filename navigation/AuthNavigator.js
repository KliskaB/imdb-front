import { createStackNavigator } from "react-navigation-stack";

import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";

export default createStackNavigator({
  SignIn,
  SignUp
});
