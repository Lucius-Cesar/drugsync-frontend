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
import TreatmentSuggestion from "../components/TreatmentSuggestion";
import { useState } from "react";

export default function TreatmentSuggestionScreen({navigation, route}) {

  const treatmentSuggestion = route.params.treatmentSuggestion
  // 
  console.log(treatmentSuggestion)
  //see the console log for the data structure
  //replace TreatmentSuggestionData like this: efo_term corresponds to disease name 
  // to display at the top of the screen, treatmentSuggestion.drugs is the array containing drugs names
  const drugs = treatmentSuggestion.drugs.map((drug, index) => (
    <TreatmentSuggestion
      key={index}
      name={drug}
      style={styles.treatments}
    />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.view}>
          <Text style={styles.text}>{treatmentSuggestion.efo_term}</Text>
        <Text style={styles.treatmentText}>Treatment suggestion: </Text>
        <Text style={styles.pressText}>Press to see interactions</Text>
        <View style={styles.treatmentContainer}>
          <ScrollView style={styles.scrollView}>{drugs}</ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  view: {
    width: "auto",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#008777",
    borderRadius: 10,
    padding: 10,
    width: 300,
    textAlign: "center",
  },
  treatmentText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    color: "#057B6C",
  },
  treatmentContainer: {
    marginTop: 20,
    maxHeight: 600,
  },
  pressText: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#163232",
    fontSize: 16,
  },
});
