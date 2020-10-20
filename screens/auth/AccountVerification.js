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

  const redirectIfVerified = async () => {
    const isVerifiedState = await authService.getIsVerified()
    setIsVerified(isVerifiedState);
    // prikazi mu njegov Home Page
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
