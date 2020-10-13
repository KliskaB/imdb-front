import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";

import authService from "../services/AuthService";

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  _bootstrapAsync = async () => {
    const user = await authService.getUser();
    if (user) {
      navigation.navigate("MainStack");
    } else {
      navigation.navigate("AuthStack");
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} />
      <StatusBar barStyle="default" />
    </View>
  );
};
AuthLoadingScreen.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },

  loading: {
    marginTop: 30
  }
});

export default AuthLoadingScreen;
