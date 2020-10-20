import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/actions/AuthActions";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from 'yup';

const SignUp = () => {
  const dispatch = useDispatch();

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

  const handleRegister = (data) => dispatch(register({ ...data, profile_picture }));

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format.')
      .required('This field is required.'),
    password: Yup.string()
      .min(8, 'Password should contain at least 8 characters.')
      .max(30, 'Password can contain a maximum of 30 characters.')
      .required('This field is required.'),
    username: Yup.string()
      .required('This field is refuired.'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        validationSchema={SignUpSchema}
        onSubmit={values => {
          handleRegister(values)
        }}
      >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
      <View>
        <TextInput
          placeholder="email"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
        ></TextInput>
        {errors.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}
        <TextInput
          placeholder="password"
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
        ></TextInput>
        {errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}
        <TextInput
          placeholder="username"
          value={values.username}
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          error={errors.username}
        ></TextInput>
        {errors.username ? (
                <Text style={styles.error}>{errors.username}</Text>
              ) : null}
        {profile_picture && (
          <View>
            <Image
              source={{ uri: profile_picture.uri }}
              style={{ width: 300, height: 300 }}
            />
          </View>
        )}
        <Button title="Choose Photo" onPress={openImagePickerAsync} />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Register </Text>
        </TouchableOpacity>
      </View>
      )}
      </Formik>
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
  error: {
    color: "red",
  }
});
