import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function Cylinder({ onChange }) {
  const [radius, setRadius] = useState(0);
  const [height, setHeight] = useState(0);

  // Calculate the area whenever the length changes
  useEffect(() => {
    let area = 2 * (Math.PI * radius) * (height + radius);
    // Notify the parent about the change in area
    if (area !== null && !isNaN(area)) {
      onChange(Number(area));
    }
  }, [radius, height]);

  return (
    <View style={styles.childContainer}>
      <Text style={styles.inputLabel}>Radius</Text>
      <TextInput
        defaultValue={String(radius)}
        inputMode="decimal"
        onChangeText={(value) => setRadius(Number(value))}
        style={styles.textInput}
      />
      <Text style={styles.inputLabel}>Height</Text>
      <TextInput
        defaultValue={String(height)}
        inputMode="decimal"
        onChangeText={(value) => setHeight(Number(value))}
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
