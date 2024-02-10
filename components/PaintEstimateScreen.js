import React, { useState, useEffect } from "react";
import PaintDetailsModal from "./modals/PaintDetailsModal";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Area } from "./Area";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const PaintEstimateScreen = ({ navigation }) => {
  const [areas, setAreas] = useState([
    { id: uuidv4(), name: "Area 1", area: Number(0) },
  ]);
  const [totalArea, setTotalArea] = useState(Number(0));
  const [totalPaint, setTotalPaint] = useState(Number(0));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coverage, setCoverage] = useState(1);
  const [coats, setCoats] = useState(1);

  // Function to add a new area
  const addArea = () => {
    const newArea = {
      id: uuidv4(),
      name: `New Area ${areas.length + 1}`,
      area: Number(0),
    };
    setAreas([...areas, newArea]);
  };

  const handleEditCoverage = () => {
    setIsModalVisible(true);
  };

  const handleSelectCoverage = (selectedCoverage) => {
    setCoverage(selectedCoverage);
  };

  const handleSetCoats = (numOfCoats) => {
    setCoats(numOfCoats);
  };

  // Function to update the area of a specific item
  const updateArea = (name, newName, area, quant) => {
    console.log("quantity check: ", quant);

    setAreas((prevAreas) =>
      prevAreas.map((prevArea) =>
        prevArea.name === name
          ? {
              ...prevArea,
              name: newName !== "" ? newName : prevArea.name,
              area: Number(area),
              quantity: quant,
            }
          : prevArea
      )
    );
  };

  function calculateTotalPaint() {
    newTotalPaint = (totalArea * coats) / coverage;
    setTotalPaint(newTotalPaint);
  }

  // Recalculate the total area whenever areas change
  useEffect(() => {
    let newTotalArea = 0;
    for (x = 0; x < areas.length; x++) {
      console.log(areas[x].area);
      newTotalArea += areas[x].area * areas[x].quantity;
    }

    if (!isNaN(newTotalArea)) {
      setTotalArea(newTotalArea);
      console.log("new total area:", newTotalArea);
      console.log("total area:", totalArea);
    }
    calculateTotalPaint();
  }, [areas]);

  useEffect(() => {
    calculateTotalPaint();
  }, [coverage, coats]);

  return (
    <View style={styles.container}>
      <PaintDetailsModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectCoverage={handleSelectCoverage}
        onSelectCoats={handleSetCoats}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <FlatList
          style={styles.areasContainer}
          data={areas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.areaContainer}>
              <Area
                key={item.id}
                name={item.name}
                onChange={(area, newName, quant) =>
                  updateArea(item.name, newName, area, quant)
                }
              />
            </View>
          )}
        />
        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <View style={styles.footerInner}>
          <Text style={styles.totalAreaText}>
            Total Area: {Number(totalArea.toFixed(2))} m2
          </Text>
          <Text style={styles.totalAreaText}>
            Total Paint: {Number(totalPaint.toFixed(2))} L
          </Text>
        </View>
        <View style={styles.footerInner}>
          <TouchableOpacity style={styles.addButton} onPress={addArea}>
            <Text style={styles.addButtonText}>Add Area</Text>
          </TouchableOpacity>
          <View style={{ height: 3 }} />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleEditCoverage}
          >
            <Text style={styles.addButtonText}>Edit Details</Text>
          </TouchableOpacity>
        </View>
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
  footerInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
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
    margin: 2,
  },
});

export default PaintEstimateScreen;
