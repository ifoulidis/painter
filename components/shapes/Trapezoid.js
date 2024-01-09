import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function Trapezoid({ onChange }) {
  const [base1, setBase1] = useState(0);
  const [base2, setBase2] = useState(0);
  const [height, setHeight] = useState(0);

  // Calculate the area whenever the length changes
  useEffect(() => {
    let area = (height / 2) * (base1 + base2);
    // Notify the parent about the change in area
    if (area !== null && !isNaN(area)) {
      onChange(Number(area));
    }
  }, [base1, base2, height]);

  return (
    <View style={styles.childContainer}>
      <Text style={styles.inputLabel}>Base 1</Text>
      <TextInput
        defaultValue={String(base1)}
        inputMode="decimal"
        onChangeText={(value) => setBase1(Number(value))}
        style={styles.textInput}
      />
      <Text style={styles.inputLabel}>Base 2</Text>
      <TextInput
        defaultValue={String(base2)}
        inputMode="decimal"
        onChangeText={(value) => setBase2(Number(value))}
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
