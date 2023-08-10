import {TextInput,View,StyleSheet,TouchableOpacity,ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer l'icône de votre choix depuis la bibliothèque;
import Patient from '../components/Patient';
import {useEffect, useState} from 'react';
//import { useState } from 'react';



export default function PatientsScreen({navigation}) {

  // Déclaration d'un état "patientsData" avec une valeur initiale vide
  const [patientsData, setPatientsData] = useState([])
  const [searchInput,setSearchInput] = useState("")

  //Utilisation de useEffect pour effectuer des opérations après le rendu initial du composant
  useEffect(()=>{
    //Appel à l'API à l'URL spécifiée pour récupérer les données des patients
    fetch("https://drugsync-backend.vercel.app/patients/allPatients")
    .then(response => response.json()) //Convertir la réponse en format JSON
    .then(data =>{
      const filterData = data.patients.filter((patient)=>patient.name.toLowerCase().includes(searchInput.toLowerCase()))
      setPatientsData(filterData) //Mettre à jour l'état "patientsData" avec les données reçues
      
    })
  }, [searchInput]) //Tableau de dépendances est rempli avec searchinput, qui lui est changé grace a onChangeText , a chaque fois que la valeur va etre change le code contenu dans le useEffect va etre reéxecuter


  function handleDeletePatientFromScreen(name) {
    const updatedPatientsData = patientsData.filter(patient => patient.name !== name);
    setPatientsData(updatedPatientsData);
}

    const patients = patientsData.map((data,i) =>{
      return <Patient key={i}  name={data.name} navigation = {navigation} onDeletePatient={handleDeletePatientFromScreen}/>
    })


    return(
        <View style = {styles.container}>
          <View style = {styles.searchContainer}>

            <TextInput style = {styles.searchInput} placeholder="Search"
            onChangeText={ (value) => setSearchInput(value)}
            value={searchInput}
            />
            <View style={styles.searchIconContainer}>
              <TouchableOpacity style= {styles.searchIcon}>
                <Icon name="search" size={20} color="black"/>
              </TouchableOpacity>
            </View>
          
          </View>

          <ScrollView contentContainerStyle = {styles.patientsContainer}>
            {patients}
          </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({

  container :{
    flex: 1,
    backgroundColor: "#FOFOFO",
    paddingTop: 50
  },

  searchContainer :{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    paddingVertical: 8,
    
    
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'center',
  
  },

  searchIconContainer: {
    postion: "abosulute",
    right: 15, // Valeur qui permet d'ajuster l'icone vers la droite
    alignItems: "center",
    justifyContent: "center",
  },

  searchIcon: { 
    borderRadius: 10,
    padding: 10, // permet d'augment la hauteur du champ de recherche
  },

  patientsContainer: {
    marginHorizontal: 20,
    justifyContent: "center", // centrer verticalement 
    alignItems: "center", // centrer horizontalement
    //borderWidth: 3, je l'ai utilisé pour pouvoir cadré mon scrollView et travaillé decu pour le faire descendre
    marginTop: 150,
  }



})