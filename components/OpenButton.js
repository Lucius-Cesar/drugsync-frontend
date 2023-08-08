import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function OpenButton({ interactionData, interactionType }) {
  const [textVisible, setTextVisible] = useState(
    new Array(interactionData ? interactionData.length : 0).fill(false)
  );

  let filteredInteractions;
    if (interactionData) {
      if (interactionType === 'current') {
        filteredInteractions = interactionData.currentTreatmentInteractions;
      } else {
        filteredInteractions = interactionData.searchedInteractions;
      }
    } else {
      filteredInteractions = [];
    }

  const handleToggleText = (index) => {
    setTextVisible((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  const getSeverityColor = (severity) => {
    if (severity === 'minor') {
      return '#ECBF20';
    } else if (severity === 'moderate') {
      return '#FC945A';
    } else if (severity === 'major') {
      return '#EB483E';
    } else {
      return 'gray';
    }
  };

  return (
    <View style={styles.container}>
      {filteredInteractions.length > 0 ? (
        filteredInteractions.map((interaction, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleToggleText(index)}
            style={styles.button}
          >
            <View style={[styles.btnName,{ borderColor: getSeverityColor(interaction.severity) },]} >
              <FontAwesome name={'warning'} size={18} color={getSeverityColor(interaction.severity)} />
              <Text style={styles.buttonText}>
                {interaction.drugA} -- {interaction.drugB}
              </Text>
              <FontAwesome
                name={textVisible[index] ? 'chevron-down' : 'chevron-right'}
                size={18}
                color= '#163232'
              />
            </View>
            {textVisible[index] && (
              <View style={styles.additionalTextContainer}>
                <View style={styles.severityContainer}>
                  <Text style={styles.severity}>Severity: </Text>
                  <Text style={[styles.severityText,{ color: getSeverityColor(interaction.severity) },]}>{interaction.severity}</Text>
                </View>
                <Text style={styles.additionalText}>{interaction.description}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.buttonText}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  btnName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    width: 300,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#163232',
  },
  additionalTextContainer: {
    marginTop: 0,
    backgroundColor: 'rgba(229,229,229,0.65)',
    width: 280,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  additionalText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  severityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  severityContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  severity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
});
