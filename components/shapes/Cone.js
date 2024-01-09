import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function Cone({ onChange }) {
  const [radius, setRadius] = useState(0);
  const [length, setLength] = useState(0);

  // Calculate the area whenever the length changes
  useEffect(() => {
    let area = Math.PI * radius * (length + radius);
    // Notify the parent about the change in area
    if (area !== null && !isNaN(area)) {
      onChange(Number(area));
    }
  }, [radius, length]);

  return (
    <View style={styles.childContainer}>
      <Text style={styles.inputLabel}>Radius</Text>
      <TextInput
        defaultValue={String(radius)}
        inputMode="decimal"
        onChangeText={(value) => setRadius(Number(value))}
        style={styles.textInput}
      />
      <Text style={styles.inputLabel}>Length</Text>
      <TextInput
        defaultValue={String(length)}
        inputMode="decimal"
        onChangeText={(value) => setLength(Number(value))}
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
