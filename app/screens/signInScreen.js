import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

const SignInScreen = (props) => {
  const [tempUsername, setTempUsername] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  const checkCreds = (tempUsername, tempPassword) => {
    props.setLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 30, top: 200 }}>
        <Text style={{ fontWeight: "bold", fontSize: "36" }}>
          Zedify Rider App
        </Text>
      </View>

      <View style={{ top: 250, width: "100%", alignItems: "center" }}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="black"
          onChangeText={(username) => setTempUsername(username)}
        />

        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={(password) => setTempPassword(password)}
        />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => checkCreds(tempUsername)}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    // justifyContent: "center",
  },

  inputView: {
    backgroundColor: "#dfdfdf",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 45,
    // flex: 1,
    padding: 10,
    backgroundColor: "#dfdfdf",
    borderRadius: 30,
    width: "70%",
    textAlign: "center",
    color: "black",

    marginBottom: 20,

    alignItems: "center",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "red",
  },
});

export default SignInScreen;
