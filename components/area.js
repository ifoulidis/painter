import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
// Shape components
import Square from "./shapes/Square.js";
import Rectangle from "./shapes/Rectangle.js";
// import Triangle from "./shapes/Triangle.js";
// import Trapezoid from "./shapes/Trapezoid.js";
// import Cylinder from "./shapes/Cylinder.js";
// import Cone from "./shapes/Cone.js";
// import Sphere from "./shapes/Sphere.js";

export function Area({ name, onChange }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [shape, setShape] = useState(null);
  const [area, setArea] = useState(0);
  const shapes = [
    { label: "Square", value: "square" },
    { label: "Rectangle", value: "rectangle" },
    // { label: "Triangle", value: "triangle" },
    // { label: "Trapezoid", value: "trapezoid" },
    // { label: "Cylinder", value: "cylinder" },
    // { label: "Cone", value: "cone" },
    // { label: "Sphere", value: "sphere" },
  ];

  // useEffect(() => {
  //   // Any additional actions when the selected value changes
  //   // For example, reset measurements, update UI, etc.
  // }, [value]);

  useEffect(() => {
    if (area !== null && !isNaN(area)) {
      // Notify the parent when the shape changes
      onChange(area);
    }
  }, [shape, area]);

  // Render the selected shape component
  const renderShapeComponent = () => {
    switch (shape) {
      case "square":
        return <Square onChange={(area) => setArea(Number(area))} />;
      case "rectangle":
        return <Rectangle onChange={(area) => setArea(Number(area))} />;
      // case "triangle":
      //   return (
      //     <Triangle onChange={(area) => setArea(area)} />
      //   );
      // case "trapezoid":
      //   return (
      //     <Trapezoid onChange={(area) => setArea(area)} />
      //   );
      // case "cylinder":
      //   return (
      //     <Cylinder onChange={(area) => setArea(area)} />
      //   );
      // case "cone":
      //   return <Cone onChange={(area) => setArea(area)} />;
      // case "sphere":
      //   return <Sphere onChange={(area) => setArea(area)} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.childContainer} key={name}>
      <TextInput defaultValue={name}></TextInput>
      <Text style={styles.inputLabel}>Shape</Text>
      <DropDownPicker
        style={styles.dropdownPicker}
        open={dropDownOpen}
        value={shape}
        items={shapes}
        setOpen={setDropDownOpen}
        setValue={setShape}
      />
      {/* Render the selected shape component */}
      {renderShapeComponent()}
      <Text style={styles.areaText}>Area: {String(area.toFixed(2))}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity: </Text>
        <TextInput defaultValue={String(1)} style={styles.quantityInput} />
      </View>
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
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  areaText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  dropdownPicker: {
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  quantityInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 60,
  },
});
