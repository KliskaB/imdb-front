import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";

import authService from "../services/AuthService";
import { authUser } from "../store/actions/AuthActions";

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  _bootstrapAsync = async () => {
    const user = await authService.getUser();
    const isVerified = await authService.getIsVerified();
    if (user && isVerified) {
      navigation.navigate("MainStack");
    } else if(user && !isVerified){
      navigation.navigate("VerifyStack");
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
