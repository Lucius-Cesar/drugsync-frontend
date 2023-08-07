import {TextInput,View,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer l'icône de votre choix depuis la bibliothèque;
import Patient from '../components/Patient';
//import { useState } from 'react';



export default function PatientsScreen() {
    const patientsData =[
      {title : 'patient 1'},
      {title : 'patient 2'},
      {title : 'patient 3'},
      {title : 'patient 4'},
      {title : 'patient 5'},
      {title : 'patient 6'},
      {title : 'patient 7'},
    ]

    const patients = patientsData.map((data,i) =>{
      return <Patient key={i} title={data.title}/>
    })



    return(
        <View style = {styles.container}>
          <View style = {styles.searchContainer}>

            <TextInput style = {styles.searchInput} placeholder="Search"/>
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