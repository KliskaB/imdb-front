import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Button } from "react-native";
import PropTypes from "prop-types";
import authService from "../../services/AuthService";
import MyText from "../../components/helper/MyText";

const AccountVerification = ({ navigation }) => {

  navigationOptions = {
    title: "My profile",
  };

  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = async () => {
      try{
        const user = await authService.getUserDetails();
        setUserDetails(user);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <View style={styles.container}>
        <MyText>My profile</MyText> 
        <View style={styles.row}>
            <MyText>Email: </MyText>
            <MyText>{userDetails.email}</MyText>
        </View>
        <View style={styles.row}>
            <MyText>Username: </MyText> 
            <MyText>{userDetails.username}</MyText>
        </View>
        <View>
            <Image
              source={{ uri: userDetails.profile_picture }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        <View style={styles.row}>
            <Button title="Edit profile" />
            <Button title="Change password" />
        </View>
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
    marginTop: 20,
    alignItems: "center",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
  }
});
