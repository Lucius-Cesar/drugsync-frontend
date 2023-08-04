import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import InteractionContainer from '../components/InteractionContainer';
import OpenButton from '../components/OpenButton';

export default function InteractionScreen() {
  const [interactionData, setInteractionData] = useState(null);

  useEffect(() => {
    fetch("https://drugsync-backend-p4qdt6w2w-lucius-cesar.vercel.app/interactions/207106+152923/656659", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log(true);
          setInteractionData(data);
        } else {
          console.log(false);
          console.log(data.error); // Later: display the error directly to the friend with a drugInputError state
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drug Interactions</Text>
      <View style={styles.interactionContainer}>
        <InteractionContainer />
      </View>
      <ScrollView style={styles.scrollViewTreatment}>
        <OpenButton interactionData={interactionData} interactionType="current" />
      </ScrollView>
      <Text style={styles.searchText}>Searched: <Text style={styles.searchedText}>Infliximab</Text></Text>
      <ScrollView style={styles.scrollViewSearched}>
        <OpenButton interactionData={interactionData} interactionType="searched" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  interactionContainer: {
    flexDirection: 'row',
  },
  title: {
    marginTop: 50,
    color: '#008777',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollViewTreatment: {
    height: '75%',
  },
  scrollViewSearched: {
    height: '100%',
  },
  searchText: {
    marginTop: 20,
    marginBottom: 20,
    color: '#008777',
    fontSize: 30,
    textAlign: 'center',
  },
  searchedText: {
    fontSize: 30,
    color: '#008777',
    fontWeight: 'bold',
  },
});
