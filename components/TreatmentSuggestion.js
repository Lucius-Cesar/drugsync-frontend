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
      <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleContent()} style={styles.openContainer}>
        <Text style={styles.name}>{props.name}</Text>
          <FontAwesome
              name={showDescription ? 'caret-down' : 'caret-right'}
              size={22}
              color= '#163232'
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchIcon}>
            <FontAwesome name='search' size={22} color= '#163232'></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
      {showDescription && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{props.description}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  openContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#163232',
  },
  descriptionContainer:{
    marginTop: 0,
    backgroundColor: 'rgba(229,229,229,0.65)',
    width: 230,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 10,
  },
  description:{
    fontSize: 16,
    color: '#163232',
  },
  searchContainer: {
    width: 120,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    marginTop: 25,
  },
});
