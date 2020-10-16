import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/actions/AuthActions";
import * as ImagePicker from "expo-image-picker";

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profile_picture, setProfilePicture] = useState(null);

  navigationOptions = {
    title: "Sign in",
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setProfilePicture(pickerResult);
  };

  const handleLogin = (data) => dispatch(register(data));

  const submitLogin = () => {
    handleLogin({ email, password, username, profile_picture });
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
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      ></TextInput>
      {profile_picture && (
        <View>
          <Image
            source={{ uri: profile_picture.uri }}
            style={{ width: 300, height: 300 }}
          />
        </View>
      )}
      <Button title="Choose Photo" onPress={openImagePickerAsync} />
      <TouchableOpacity onPress={submitLogin}>
        <Text>Register </Text>
      </TouchableOpacity>
    </View>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.object,
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
