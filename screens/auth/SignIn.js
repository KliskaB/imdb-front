import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import { logIn } from "../../store/actions/AuthActions";

const SignIn = ({ navigation }) => {
  navigationOptions = {
    title: "Sign in"
  };

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = data => dispatch(logIn(data));

  const submitLogin = () => {
    handleLogin({ email, password });
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <TouchableOpacity onPress={submitLogin}>
        <Text>Log In </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text>Register </Text>
      </TouchableOpacity>
    </View>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.object
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
