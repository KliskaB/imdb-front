import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../store/actions/AuthActions";
import { MaterialIcons } from "@expo/vector-icons";

const SignIn = ({ navigation }) => {

  navigationOptions = {
    title: "Sign in",
  };

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const readData = async () => {
      try {
        let signedUp = false;
        const value = await AsyncStorage.getItem('isSignedUp');
        if (value !== null && value !== undefined) {
          signedUp = JSON.parse(value);
          setIsSignedUp(signedUp);
          setModalOpen(signedUp);
        }
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    readData()
  }, [])

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
