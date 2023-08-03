import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Treatment from '../components/Treatment';
import Pathology from '../components/Pathology';
import { loadPatientInfo, addDrugToCurrentTreatment, addPathology} from '../reducers/patient';





export default function TreatmentScreen() {
    
    //Input states
    const [addDrugInput, setAddDrugInput] = useState("")
    const [addPathologyInput, setAddPathologyInput] = useState("")

    //Redux
    const dispatch = useDispatch()
    const patient = useSelector((state) => state.patient.value);

    useEffect(() => {
        dispatch(loadPatientInfo(patientPayload))
        },
        []
      )

    const patientPayload = { //simulating patients DB
        currentTreatment: [{
            name: "Infliximab",
            rxcui: "191831"
        }],
        pathologies : [
            {
                name: "Polyarthrite Rheumatoïde",
            }
        ]
    }
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
        }
        else{
            console.log("nop")
            console.log(data.error) // later: display the error directly to the frend with a drugInputError state
        }
    })
    }    
    
    const treatment = patient.currentTreatment.map((data, i) => {
        return (
              <Treatment key={i} name={data.name}/>
          );
       });

       function handleAddPathologyButton(){
            const pathologyPayload = {
                name: addPathologyInput
            }
            dispatch(addPathology(pathologyPayload))
       }


    const pathologies = patient.pathologies.map((data, i) => {
            return (
                  <Pathology key={i} name={data.name}/>
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
                <TextInput placeholder='Add drug name here'
                 style={styles.inputText} 
                 onChangeText = {value => setAddDrugInput(value)}
                 value = {addDrugInput} />
                <TouchableOpacity onPress = {handleAddDrugButton}>
                    <FontAwesome name="plus-circle" size={30} color="#008777"/>
                </TouchableOpacity>
            </View>
            <View style={styles.patientTreatment}>
                <Text style={styles.titleText}>Pathologies</Text>
            </View>
                {pathologies}
            <View style={styles.addContainer}>
                <TextInput placeholder='Add pathology name here'
                 style={styles.inputText} 
                 onChangeText = {value => setAddPathologyInput(value)}
                 value = {addPathologyInput} />
                <TouchableOpacity onPress = {handleAddPathologyButton}>
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