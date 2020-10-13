import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import PropTypes from "prop-types";

const LeftSlider = ({ navigation }) => {
  logout = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("AuthStack");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={navigation.closeDrawer} title="Close me" />

        <Button onPress={logout} title="Logout" />
      </View>
    </SafeAreaView>
  );
};

LeftSlider.propTypes = {
  navigation: PropTypes.object
};

export default LeftSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
