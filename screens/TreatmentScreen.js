import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import Treatment from '../components/Treatment';
import Pathology from '../components/Pathology';

export default function TreatmentScreen() {

    const treatmentData = [
        {
            name: "Paracétamol",
        },{
            name: "Aspirin",
        },{
            name: "Tramadol",
        }
    ]
    const treatment = treatmentData.map((data, i) => {
        return (
              <Treatment name={data.name}/>
          );
       });

       const pathologyData = [
        {
            name: "Polyarthrite Rhumatoïde",
        }
    ]
    const pathology = pathologyData.map((data, i) => {
            return (
                  <Pathology name={data.name}/>
              );
           });
    return(
        <View style={styles.container}>
            <View style={styles.patientName}>
                <Text style={styles.titleText}>Patient Name</Text>
            </View>
            <View style={styles.patientTreatment}>
                <Text style={styles.titleText}>Patient current treatment</Text>
            </View>
                {treatment}
            <View style={styles.addContainer}>
                <TextInput placeholder='Add' style={styles.inputText}></TextInput>
                <TouchableOpacity>
                    <FontAwesome name="plus-circle" size={30} color="#008777"/>
                </TouchableOpacity>
            </View>
            <View style={styles.patientTreatment}>
                <Text style={styles.titleText}>Pathologies</Text>
            </View>
                {pathology}
            <View style={styles.addContainer}>
                <TextInput placeholder='Add' style={styles.inputText}></TextInput>
                <TouchableOpacity>
                    <FontAwesome name="plus-circle" size={30} color="#008777"/>
                </TouchableOpacity>
            </View>
            <View style={styles.validateContainer}>
                <TouchableOpacity style={styles.validate}>
                    <Text style={styles.validateText}>Validate</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    patientName: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(218,218,218,0.33)',
        width: 190,
        height: 40,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 50,
        marginLeft: 20,
        },
    patientTreatment: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#82D2CB',
        width: '100%',
        height: 40,
    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
    },
    inputText: {
        width: 180,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#008777',
        marginRight: 10,
        textAlign: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#163232',
    },
    validateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    validate:{
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#057B6C",
        width: 100,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    validateText: {
        fontSize: 20,
        color: "#057B6C",
        fontWeight: "600"
        },
});