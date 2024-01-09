import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements"; // Import Card from your library

import { useAuth } from "./AuthContext";

const AuthenticatedApp = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Perform logout logic
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to Your Dashboard!</Text>

      <Card containerStyle={styles.cardContainer}>
        <Button
          title="View Quotes"
          onPress={() => navigation.navigate("QuoteScreen")}
        />
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Button
          title="Estimate Paint"
          onPress={() => navigation.navigate("PaintEstimateScreen")}
        />
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Button
          title="Estimate By Floor Plan Area"
          onPress={() => navigation.navigate("EstimateByFPAScreen")}
        />
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Button
          title="Guidance"
          onPress={() => navigation.navigate("GuidanceScreen")}
        />
      </Card>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    width: "100%",
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default AuthenticatedApp;
