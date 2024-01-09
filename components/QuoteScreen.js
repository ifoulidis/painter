import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { PDFDocument, rgb } from "react-native-pdf-lib";
import Mailer from "react-native-mail";

const QuoteScreen = ({ navigation }) => {
  const [roomSize, setRoomSize] = useState("");
  const [paintColor, setPaintColor] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const generateAndSendQuote = async () => {
    try {
      // Generate PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      page.drawText(`Room Size: ${roomSize}`, {
        x: 50,
        y: 750,
        color: "rgb(0, 0, 0)",
      });
      page.drawText(`Paint Color: ${paintColor}`, {
        x: 50,
        y: 730,
        color: "rgb(0, 0, 0)",
      });
      page.drawText(`Additional Details: ${additionalDetails}`, {
        x: 50,
        y: 710,
        color: "rgb(0, 0, 0)",
      });

      const pdfBytes = await pdfDoc.save();

      // Send Email with PDF attachment
      Mailer.mail(
        {
          subject: "Painting Quote",
          recipients: ["recipient@example.com"],
          body: "Here is your painting quote.",
          isHTML: true,
          attachment: {
            path: "data:application/pdf;base64," + pdfBytes.toString("base64"),
            type: "pdf",
            name: "Painting_Quote.pdf",
          },
        },
        (error, event) => {
          if (error) {
            console.error("Error sending email:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <View>
      <Text>Quote Screen</Text>

      {/* Input fields for customization */}
      <TextInput
        placeholder="Room Size"
        value={roomSize}
        onChangeText={(text) => setRoomSize(text)}
      />
      <TextInput
        placeholder="Paint Color"
        value={paintColor}
        onChangeText={(text) => setPaintColor(text)}
      />
      <TextInput
        placeholder="Additional Details"
        value={additionalDetails}
        onChangeText={(text) => setAdditionalDetails(text)}
        multiline
      />

      {/* Button to generate and send the quote */}
      <Button title="Generate & Send Quote" onPress={generateAndSendQuote} />
    </View>
  );
};

export default QuoteScreen;
