import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../store/actions/AuthActions";
import { Formik } from "formik";
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .required('This field is required.'),
  password: Yup.string()
    .min(8, 'Password is too short.')
    .max(30, 'Password is too long.')
    .required('This field is required.'),
});

const SignIn = ({ navigation }) => {

  navigationOptions = {
    title: "Sign in",
  };

  const dispatch = useDispatch();

  const handleLogin = (data) => dispatch(logIn(data));

  const handleNavigateToRegister = () => {
    navigation.navigate("SignUp");
  };

  return (
    
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={values => {
          handleLogin(values)
        }}
      >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View>
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
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Log In </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToRegister}>
            <Text>Register </Text>
          </TouchableOpacity>
        </View>
      )}
      </Formik>
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
  error: {
    color: "red",
  }
});
