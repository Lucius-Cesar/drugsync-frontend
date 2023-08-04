import {View,Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import TreatmentLight from './TreatmentLight';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from'react-redux';
import { loadPatientInfo, addDrugToCurrentTreatment} from '../reducers/patient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InteractionContainer(props){

    const [addDrugInput, setAddDrugInput] = useState("")
    const patient = useSelector((state) => state.patient.value);

    const dispatch = useDispatch()

    function handleAddDrugButton(){

        fetch("https://drugsync-backend.vercel.app/drugs", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            drug: addDrugInput,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log("yes")
                const drugPayload = {
                    name: data.drugData.name,
                    rxcui: data.drugData.rxNav[0].rxcui
                }
                dispatch(addDrugToCurrentTreatment(drugPayload))
                setAddDrugInput("");
            }
            else{
                console.log("nop")
                console.log(data.error) // later: display the error directly to the frend with a drugInputError state
            }
    })
    } 
    const treatment = patient.currentTreatment.map((data, i) => {
        return (
              <TreatmentLight key={i} name={data.name}/>
          );
       });
return(
<View>
    <Text style={styles.currentTreatment}>Current Treatment</Text>
    <View style={styles.treatmentContainer}>
        {treatment}
    </View>
    <View style={styles.addContainer}>
                <TextInput placeholder='Add' style={styles.inputText} 
                onChangeText = {value => setAddDrugInput(value)}
                value = {addDrugInput} ></TextInput>
                <TouchableOpacity onPress = {handleAddDrugButton}>
                    <FontAwesome name="plus-circle" size={15} color="#008777"/>
                </TouchableOpacity>
    </View>
</View>
)
}

const styles = StyleSheet.create({
    currentTreatment: {
        fontSize: 20,
        color: '#008777',
        marginLeft: 10,
        marginTop: 20,
        },
    treatmentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
    },
    inputText: {
        width: 'auto',
        height: 20,
        borderRadius: 10,
        marginRight: 10,
        textAlign: 'center',
    },
});