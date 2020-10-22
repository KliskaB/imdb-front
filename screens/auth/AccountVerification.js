import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../../store/actions/AuthActions";
import { MaterialIcons } from "@expo/vector-icons";
import authService from "../../services/AuthService";
import { Formik } from "formik";
import * as Yup from 'yup';

const AccountVerificationSchema = Yup.object().shape({
  verification_code: Yup.string()
    .matches(/^[0-9]{4}$/, 'Verification code contains of exactly 4 digits.')
    .required('This field is required.'),
});

const AccountVerification = ({ navigation }) => {

  navigationOptions = {
    title: "Verify Account",
  };

  const dispatch = useDispatch();

  const [isVerified, setIsVerified] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const redirectIfRegistered = async () => {
    const signedUp = await authService.getIsSignedUp()
    setIsSignedUp(signedUp);
    setModalOpen(signedUp);
  };

  useEffect(() => {
    redirectIfRegistered()
  }, [])

  const redirectIfVerified = async () => {
    const isVerifiedState = await authService.getIsVerified()
    setIsVerified(isVerifiedState);
  };

  useEffect(() => {
    redirectIfVerified()
  }, [])

  const handleVerification = (data) => dispatch(verify(data));

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ verification_code: '' }}
        validationSchema={AccountVerificationSchema}
        onSubmit={values => {
          handleVerification(values)
        }}
      >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View>
          <TextInput
            placeholder="verification code"
            value={values.verification_code}
            onChangeText={handleChange('verification_code')}
            onBlur={handleBlur('verification_code')}
            error={errors.verification_code}
          ></TextInput>
          {errors.verification_code ? (
                    <Text style={styles.error}>{errors.verification_code}</Text>
                  ) : null}
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Verify</Text>
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
      )}
      </Formik>
    </View>
  );
};

AccountVerification.propTypes = {
  navigation: PropTypes.object,
};

export default AccountVerification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 100,
  },
  error: {
    color: "red",
  }
});
