import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { authUserSelector } from "../../store/selectors/AuthUserSelector";
import { logIn } from "../../store/actions/AuthActions";
import { MaterialIcons } from "@expo/vector-icons";

const SignIn = ({ navigation }) => {
  navigationOptions = {
    title: "Sign in",
  };

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const authUser = useSelector(authUserSelector);
  console.log("authUser: ", authUser);

  const handleLogin = (data) => dispatch(logIn(data));

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
      <MaterialIcons name="add" size={24} onPress={() => setModalOpen(true)} />

      <Modal visible={modalOpen} animationType="slide" transparent={true}>
        <View
          style={
            (StyleSheet.modalContent,
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            })
          }
        >
          <Text>
            We've sent you an email. Please, verify your identity before
            continuing.
          </Text>
          <MaterialIcons
            name="close"
            size={24}
            onPress={() => setModalOpen(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.object,
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
