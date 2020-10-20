import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../../store/actions/AuthActions";
import { MaterialIcons } from "@expo/vector-icons";
import authService from "../../services/AuthService";

const AccountVerification = ({ navigation }) => {

  navigationOptions = {
    title: "Verify Account",
  };

  const dispatch = useDispatch();

  const [verificationCode, setVerificationCode] = useState("");
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

  const submitVerification = () => {
    handleVerification({ verification_code: verificationCode });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      ></TextInput>
      <TouchableOpacity onPress={submitVerification}>
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
});
