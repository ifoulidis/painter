import { StatusBar } from "expo-status-bar";
import "react-native-url-polyfill/auto";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Area } from "./components/area.js";
import { supabase } from "./lib/supabase.js";
import Auth from "./components/AuthContext.js";
import { Session } from "@supabase/supabase-js";

export default function App() {
  const [session, setSession] = (useState < Session) | (null > null);
  // State to manage the list of areas
  const [areas, setAreas] = (useState < Session) | (null > null);

  // Function to add a new area
  const addArea = (name) => {
    setAreas([...areas, <Area name={name} key={areas.length} />]);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
      {/* Render existing areas */}
      {areas}

      {/* Button to add a new area */}
      <Button title="Add Area" onPress={addArea} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
