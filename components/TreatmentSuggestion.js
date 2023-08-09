import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

export default function TreatmentSuggestion(props) {


  return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.openContainer}>
        <Text style={styles.name}>{props.name}</Text>
        </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    backgroundColor: '#C3F1ED',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#163232',
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: '#82D2CB',
    borderRadius: 20,
    padding: 10,
    width: 800,
  },
});
