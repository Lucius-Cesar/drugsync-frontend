import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import InteractionContainer from '../components/InteractionContainer';
import OpenButton from '../components/OpenButton';
import { useDispatch, useSelector } from "react-redux";
import loadingGif from '../assets/Spinner.gif';


export default function InteractionScreen({navigation, route}) {
  
  //loading gif
  const [isLoading, setIsLoading] = useState(false);

  //redux
  const [interactionData, setInteractionData] = useState(null);
  const {searchedDrugData} = route.params
  const patient = useSelector((state) => state.patient.value);


  useEffect(() => {
      const patientCurrentTreatmentRxcuiJoin = patient.currentTreatment.map(drug => drug.rxcui).join("+")
      const url = `https://drugsync-backend.vercel.app/interactions/${patientCurrentTreatmentRxcuiJoin}/${searchedDrugData.rxNav[0].rxcui}`
      setIsLoading(true);
      fetch(url)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false)
        if(data.result){
          setInteractionData(data)
        }
        else{
          console.log(data.error) // later display error with an error react state
    }
  })}, [patient]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drug Interactions</Text>
      <View style={styles.interactionContainer}>
        <InteractionContainer />
      </View>
      <ScrollView style={styles.scrollViewTreatment}>
        {isLoading && <Image source={loadingGif} style={styles.loadingGif} />}
        <OpenButton interactionData={interactionData} interactionType="current" />
      </ScrollView>
      <Text style={styles.searchText}>Searched: <Text style={styles.searchedText}>{searchedDrugData.name}</Text></Text>
      <ScrollView style={styles.scrollViewSearched}>
        {isLoading && <Image source={loadingGif} style={styles.loadingGif} />}
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
  loadingGif: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    marginLeft: 170,
  },
});
