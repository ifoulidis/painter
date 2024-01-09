import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

export default function Triangle({ onChange }) {
  const [base, setBase] = useState(0);
  const [height, setHeight] = useState(0);

  // Calculate the area whenever the length changes
  useEffect(() => {
    const area = 0.5 * (base * height);
    // Notify the parent about the change in area
    onChange(area);
  }, [base, height]);

  return (
    <View style={styles.childContainer}>
      <Text style={styles.inputLabel}>Base</Text>
      <TextInput
        placeholder={String(base)}
        inputMode="decimal"
        onChangeText={(b) => setBase(Number(b))}
        style={styles.textInput}
      />
      <Text style={styles.inputLabel}>Height</Text>
      <TextInput
        placeholder={String(height)}
        inputMode="decimal"
        onChangeText={(h) => setHeight(Number(h))}
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
