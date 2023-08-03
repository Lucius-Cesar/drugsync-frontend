import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

export default function TreatmentSuggestion(props) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleContent = () => {
    setShowDescription(!showDescription);
  };

  return (
    <>
      <View style={styles.view}>
        <Text style={styles.name}>{props.name}</Text>
        <Button
          style={styles.button}
          title={showDescription ? "▼" : "▶️"}
          onPress={toggleContent}
        />
      </View>
      {showDescription && (
        <View style={{ padding: 20 }}>
          <Text style={styles.description}>{props.description}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
  },
  name: {
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
  },
  view: {
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 300,
    alignItems: "center",
  },
});
