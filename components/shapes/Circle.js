import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

export default function Circle({ onChange }) {
  const [radius, setRadius] = useState(0);

  // Calculate the area whenever the length changes
  useEffect(() => {
    const area = Math.PI * (radius ^ 2);
    // Notify the parent about the change in area
    onChange(area);
  }, [radius]);

  return (
    <View style={styles.childContainer}>
      <Text style={styles.inputLabel}>Radius</Text>
      <TextInput
        placeholder={String(radius)}
        inputMode="decimal"
        onChangeText={(rad) => setRadius(Number(rad))}
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  childContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
});
