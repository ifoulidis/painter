// RegisterScreen.js

import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useAuth } from "./AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Perform input validation if needed
    register(email, password);
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.container}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.container}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  registerButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
    color: "gray",
  },
  loginLink: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
