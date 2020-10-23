import React, {useState} from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  AsyncStorage,
  Switch,
  Text
} from "react-native";
import PropTypes from "prop-types";

const LeftSlider = ({ navigation }) => {
  logout = () => {
    AsyncStorage.clear();
    navigation.navigate("AuthStack");
  };

  const displayProfile = () => {
    navigation.closeDrawer;
    navigation.navigate("Profile");
  }

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={navigation.closeDrawer} title="Close me" />
        <Button onPress={displayProfile} title="My profile" />
        <View style={styles.notifications}>
          <View style={styles.row}>
            <Text style={styles.text}>Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
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
  },
  notifications: {
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
  },
  text: {
    marginTop: 6,
    marginRight: 4,
    fontSize: 20,
    color: "#81b0ff",
  }
});
