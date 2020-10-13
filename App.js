import React from "react";
import { Platform, StatusBar } from "react-native";
import { Provider } from "react-redux";

import store from "./store";
import NavigationService from "./services/NavigationService";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
