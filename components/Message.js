import { StyleSheet, Text, View } from "react-native";

export const Message = ({ variant, content }) => {
  // Include a variant for a different appearance
  return (
    <View className={`custom-alert c-alert-${variant}`}>
      <Text>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customAlert: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "gold",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "18px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    zIndex: "9999",
  },
});
