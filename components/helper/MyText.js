import React from 'react';
import { StyleSheet, Text } from "react-native";

const MyText = ({ children }) => {
    return (
        <Text style={styles.text}>{children}</Text>
    );
}

export default MyText;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        margin: 2,
    }
  });