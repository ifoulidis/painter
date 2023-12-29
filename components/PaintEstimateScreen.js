import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Area } from "./area";
import { Message } from "./Message";

const PaintEstimateScreen = ({ navigation }) => {
  const [areas, setAreas] = useState([{ name: "Area 1", area: Number(0) }]);
  const [totalArea, setTotalArea] = useState(Number(0));

  // Function to add a new area
  const addArea = () => {
    const newArea = { name: `New Area ${areas.length + 1}`, area: Number(0) };
    setAreas([...areas, newArea]);
  };

  // Function to update the area of a specific item
  const updateArea = (name, area) => {
    console.log("area check: ", area);
    setAreas((prevAreas) =>
      prevAreas.map((prevArea) =>
        prevArea.name === name ? { ...prevArea, area: Number(area) } : prevArea
      )
    );
  };

  // Recalculate the total area whenever areas change
  useEffect(() => {
    let newTotalArea = 0;
    for (x = 0; x < areas.length; x++) {
      console.log(areas[x].area);
      newTotalArea += areas[x].area;
    }

    if (!isNaN(newTotalArea)) {
      setTotalArea(newTotalArea);
      console.log("new total area:", newTotalArea);
      console.log("total area:", totalArea);
    }
  }, [areas]);

  return (
    <View style={styles.container}>
      <FlatList
        data={areas}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.areaContainer}>
            <Area
              key={item.name}
              name={item.name}
              onChange={(area) => updateArea(item.name, area)}
              style={styles.parentContainer}
            />
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalAreaText}>Total Area: {totalArea}</Text>
        <TouchableOpacity style={styles.addButton} onPress={addArea}>
          <Text style={styles.addButtonText}>Add Area</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  areaContainer: {
    marginBottom: 16,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalAreaText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PaintEstimateScreen;
