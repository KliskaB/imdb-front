import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthLoading from "../screens/AuthLoading";
import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";
import AccountVerification from "../screens/auth/AccountVerification";

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading,
    AuthStack: AuthNavigator,
    MainStack: MainTabNavigator,
    VerifyStack: AccountVerification
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(AppNavigator);
