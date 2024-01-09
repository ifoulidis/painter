import React, { useState, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import { shapeStyles } from "./ShapeStyles";

export default function Sphere({ onChange }) {
  const [radius, setRadius] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // Calculate the area whenever the length changes
  useEffect(() => {
    let area = Math.PI * 4 * (radius ^ 2);
    if (quantity !== null && !isNaN(quantity)) {
      area = area * quantity;
    }

    // Notify the parent about the change in area
    if (area !== null && !isNaN(area)) {
      onChange(Number(area));
    }
  }, [radius, quantity]);

  return (
    <View style={shapeStyles.childContainer}>
      <Text style={shapeStyles.inputLabel}>Radius</Text>
      <TextInput
        defaultValue={String(radius)}
        inputMode="decimal"
        onChangeText={(value) => setRadius(Number(value))}
        style={shapeStyles.textInput}
      />
      <View style={shapeStyles.quantityContainer}>
        <Text style={shapeStyles.quantityLabel}>Quantity: </Text>
        <TextInput
          defaultValue={String(quantity)}
          onEndEditing={(text) => setQuantity(Number(text))}
          style={shapeStyles.quantityInput}
          inputMode="numeric"
        />
      </View>
    </View>
  );
}
