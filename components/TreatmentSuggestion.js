import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

export default function TreatmentSuggestion(props) {
  function handleOnPress(){
    fetch("https://drugsync-backend.vercel.app/drugs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          drug: props.name,
        }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.result){
        //Later: check if a patient preset has been already selected, if yes => navigate directly to InteractionScreen
        props.navigation.navigate("Interaction", {searchedDrugData:data.drugData})
      }
      else{
        setError(data.error);
      }
    })
    }

  return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.openContainer} onPress = {handleOnPress}>
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
