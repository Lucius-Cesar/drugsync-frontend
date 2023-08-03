import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InteractionContainer from '../components/InteractionContainer';
import { useState } from 'react';
import OpenButton from '../components/OpenButton';
import { loadPatientInfo, addDrugToCurrentTreatment, addPathology} from '../reducers/patient';


export default function InteractionScreen() {

    const [inputValue, setInputValue] = useState('');

    return(
        <View style={styles.container}>
           <Text style={styles.title}>Drug Interactions</Text>
           <View style={styles.interactionContainer}>
                <InteractionContainer/>
           </View>
           <View style={styles.addContainer}>
                <TextInput placeholder='Add' style={styles.inputText} value={inputValue} onChangeText={setInputValue}></TextInput>
                <TouchableOpacity>
                    <FontAwesome name="plus-circle" size={15} color="#008777"/>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollViewTreatment}>
                <OpenButton/>
            </ScrollView>
            <Text style={styles.searchText}>Searched: <Text style={styles.searchedText}>Infliximab</Text></Text>
            <ScrollView style={styles.scrollViewSearched}>
                    <OpenButton/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    interactionContainer: {
        flexDirection: 'row',
    },
    title:{
        marginTop: 50,
        color: '#008777',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
    },
    scrollViewTreatment: {
        height: '75%',
        },
    scrollViewSearched: {
        height: '100%',
        },
    inputText: {
        width: 'auto',
        height: 20,
        borderRadius: 10,
        marginRight: 10,
        textAlign: 'center',
    },
    searchText: {
        marginTop: 20,
        marginBottom: 20,
        color: '#008777',
        fontSize: 30,
        textAlign: 'center',
    },
    searchedText:{
        fontSize: 30,
        color: '#008777',
        fontWeight: 'bold',
    },
});