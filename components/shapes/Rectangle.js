import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

export default function Rectangle({ onChange }) {
  const [length1, setLength1] = useState(0);
  const [length2, setLength2] = useState(0);

  // Calculate the area whenever the length changes
  useEffect(() => {
    const area = length1 * length2;
    // Notify the parent about the change in area
    onChange(area);
  }, [length1, length2]);

  return (
    <View>
      <Text>Length of Side 1</Text>
      <TextInput
        placeholder={String(length1)}
        inputMode="decimal"
        onChangeText={(len) => setLength1(Number(len))}
      />
      <Text>Length of Side 2</Text>
      <TextInput
        placeholder={String(length2)}
        inputMode="decimal"
        onChangeText={(len) => setLength2(Number(len))}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
