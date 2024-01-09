import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Area } from "./Area";
import { v4 as uuidv4 } from "uuid";

const PaintEstimateScreen = ({ navigation }) => {
  const [areas, setAreas] = useState([
    { id: uuidv4(), name: "Area 1", area: Number(0) },
  ]);
  const [totalArea, setTotalArea] = useState(Number(0));
  const [totalPaint, setTotalPaint] = useState(Number(0));

  // Function to add a new area
  const addArea = () => {
    const newArea = {
      id: uuidv4(),
      name: `New Area ${areas.length + 1}`,
      area: Number(0),
    };
    setAreas([...areas, newArea]);
  };

  // Function to update the area of a specific item
  const updateArea = (name, newName, area) => {
    console.log("area check: ", area);

    setAreas((prevAreas) =>
      prevAreas.map((prevArea) =>
        prevArea.name === name
          ? {
              ...prevArea,
              name: newName !== "" ? newName : prevArea.name,
              area: Number(area),
            }
          : prevArea
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
        style={styles.areasContainer}
        data={areas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.areaContainer}>
            <Area
              key={item.id}
              name={item.name}
              onChange={(area, newName) => updateArea(item.name, newName, area)}
            />
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalAreaText}>
          Total Area: {Number(totalArea.toFixed(2))}
        </Text>
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
  areasContainer: {
    marginBottom: 50,
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
