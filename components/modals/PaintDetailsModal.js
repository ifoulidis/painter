import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

export default function PaintDetailsModal({
  isVisible,
  onClose,
  onSelectCoverage,
  onSelectCoats,
}) {
  const [coverageValue, setCoverageValue] = useState(1);
  const [coatsValue, setCoatsValue] = useState(1);

  const handleSelectCoverage = (coverage) => {
    onSelectCoverage(coverage);
    onClose();
  };

  const handleSelectCoats = (coats) => {
    onSelectCoats(coats);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Coverage</Text>
            <TouchableOpacity
              style={styles.coverageOption}
              onPress={() => handleSelectCoverage(1)}
            >
              <Text>Medium (2.5 m2/L)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.coverageOption}
              onPress={() => handleSelectCoverage(2.5)}
            >
              <TouchableOpacity
                style={styles.coverageOption}
                onPress={() => handleSelectCoverage(1)}
              >
                <Text>High (4 m2/L)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.coverageOption}
                onPress={() => handleSelectCoverage(2.5)}
              ></TouchableOpacity>
              <Text>Primer (3 m2/L)</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.customCoverageInput}
              placeholder="Enter custom coverage"
              keyboardType="decimal-pad"
              value={String(coverageValue)}
              onChangeText={(text) => {
                if (text[text.length - 1] === ".") return;
                const floatValue = parseFloat(text);
                setCoverageValue(isNaN(floatValue) ? "" : floatValue);
              }}
            />
            <Text style={styles.modalTitle}>Select No. of Coats</Text>
            <TextInput
              style={styles.customCoverageInput}
              placeholder="Enter number of coats"
              keyboardType="decimal-pad"
              value={String(coatsValue)}
              onChangeText={(text) => {
                if (text[text.length - 1] === ".") return;
                const floatValue = parseFloat(text);
                setCoatsValue(isNaN(floatValue) ? "" : floatValue);
              }}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                handleSelectCoverage(coverageValue);
                handleSelectCoats(coatsValue);
              }}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Existing styles

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%", // Set the width of the modal content
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  coverageOption: {
    padding: 3,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    borderRadius: 3,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  customCoverageInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
  },
});
