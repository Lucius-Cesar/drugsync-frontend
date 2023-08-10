import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Treatment from '../components/Treatment';
import Pathology from '../components/Pathology';
import {addDrugToCurrentTreatment, addPathology} from '../reducers/patient';
import loadingGif from '../assets/Spinner.gif';
import { resetPatientReducer } from '../reducers/patient';


export default function PatientInfoScreen({navigation, route}) {

    
    //patient name error
    const [patientNameError, setPatientNameError] = useState(false);

    //loading state
    const [isLoading, setIsLoading] = useState(false);

    //fetch error message
    const [drugError, setDrugError] = useState(false);
    
    const [patientNameInput, setPatientNameInput] = useState("")
    //route params
    let treatmentSuggestion, searchedDrugData;

    if (route.params.treatmentSuggestion) {
      treatmentSuggestion = route.params.treatmentSuggestion;
    }
    
    if (route.params.searchedDrugData) {
      searchedDrugData = route.params.searchedDrugData;
    }

    //Input states
    const [addDrugInput, setAddDrugInput] = useState("")
    const [addPathologyInput, setAddPathologyInput] = useState("")

    //Redux
    const dispatch = useDispatch()
    const patient = useSelector((state) => state.patient.value);

    
    function displaySelectedPatient(){
        function handleResetPatientButton(){
            dispatch(resetPatientReducer())
          }
        if(patient.name){
            return(
                <View style = {styles.selectedPatientContainer}>
                  <View style = {styles.patientNameContainer}>
                    <View style={styles.patientName}>
                      <Text style={styles.titleText}>{patient.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.patientCircle} onPress = {handleResetPatientButton}>
                      <FontAwesome name='times' size={15} color={'white'} />
                    </TouchableOpacity>
                  </View>     
                </View>           
              )

        }
        if(!patient.name){
            return(
                <View>
                <TextInput
                onChangeText={value => {
                    setPatientNameInput(value);
                    setPatientNameError(false);
                }}
                placeholder = "Enter Patient name"
                value = {patientNameInput}
                style={styles.patientNameInput}
                />
                {patientNameError && <Text style={styles.error}>Please enter a patient name.</Text>}
                </View>
            )
        }
    }

    
    function handleAddDrugButton(){

        setIsLoading(true);
        setDrugError(false);
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
        setIsLoading(false);
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
            console.log(data.error)
            setDrugError(data.error);
        }
    })
    }    
    
    const treatment = patient.currentTreatment.map((data, i) => {
        return (
              <Treatment key={i} name={data.name}/>
          );
       });

       function handleAddPathologyButton(){
            const pathologyPayload = addPathologyInput
            dispatch(addPathology(pathologyPayload))
            setAddPathologyInput("");
       }


    const pathologies = patient.pathologies.map((pathologyName, i) => {
            return (
                  <Pathology key={i} name={pathologyName}/>
              );
           });

    function handleValidateBtn(){


        setIsLoading(true);
        if(!patient.name){    
            if (!patientNameInput) {
                setIsLoading(false);
                setPatientNameError(true);
                return;
            }        
            fetch(("https://drugsync-backend.vercel.app/patients"),
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        name: patientNameInput,
                        currentTreatment: patient.currentTreatment.map(e => e.name),
                        pathologies: patient.pathologies
                    }
                )})
                .then(response => response.json())
                .then( data => {
                    setIsLoading(false)
                     if(data.result){
                            if(searchedDrugData){
                                navigation.navigate("Interaction", {searchedDrugData: searchedDrugData})
                            }
                            else if(treatmentSuggestion){
                                console.log(treatmentSuggestion)
                                fetch("https://drugsync-backend.vercel.app/pathologies/treatmentSuggestions",
                                {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify(treatmentSuggestion),
                                }).then(response => response.json())
                                .then(treatmentSuggData =>{
                                    if(treatmentSuggData.result){
                    
                                        console.log(treatmentSuggData)
                                        navigation.navigate("TreatmentSuggestion", {treatmentSuggestion: treatmentSuggData.treatmentSuggestions})
                                    }
                                    else{
                                        console.log(treatmentSuggData.error)
                                    }
                                })
                            }
                            else{
                                console.log("error")
                            }
                            }

                        })                 
            
        }
        else 
        // update Treatment and pathologies in the DB if reducer patient.name contains already something
        {
            fetch(("https://drugsync-backend.vercel.app/patients/updatePatient"),
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        name: patient.name,
                        currentTreatment: patient.currentTreatment.map(e => e.name),
                        pathologies: patient.pathologies
                    }
                )})
                .then(response => response.json())
                .then( data => { 
                            if(searchedDrugData){
                                console.log(searchedDrugData)
                                navigation.navigate("Interaction", {searchedDrugData: searchedDrugData})
                            }
                            else if(treatmentSuggestion){
                                console.log(treatmentSuggestion)
                                fetch("https://drugsync-backend.vercel.app/pathologies/treatmentSuggestions",
                                {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify(treatmentSuggestion),
                                }).then(response => response.json())
                                .then(treatmentSuggData =>{
                                    if(treatmentSuggData.result){
                    
                                        console.log(treatmentSuggData)
                                        navigation.navigate("TreatmentSuggestion", {treatmentSuggestion: treatmentSuggData.treatmentSuggestions})
                                    }
                                    else{
                                        console.log(treatmentSuggData.error)
                                    }
                                })
                            }
                            

                        })                 
            
        }
    
    }
        // just a boolean -> later: add a state to know if the previous research was pathology or drugs and pass it with navigation params
        
    
    return(
        <View style={styles.container}>
            {displaySelectedPatient()}
            <View style={styles.patientTreatment}>
                <Text style={styles.titleText}>Patient current treatment</Text>
            </View>
            <ScrollView style={styles.scrollViewTreatment}>
                {treatment}
            <View style={styles.addContainer}>
                <TextInput placeholder='Add drug name here'
                 style={styles.inputText} 
                 onChangeText = {value => setAddDrugInput(value)}
                 value = {addDrugInput} />
                <TouchableOpacity onPress = {handleAddDrugButton}>
                    <FontAwesome name="plus-circle" size={30} color="#008777"/>
                </TouchableOpacity>
                {isLoading && <Image source={loadingGif} style={{ width: 30, height: 30 }} />}
            </View>
            {drugError && <Text style={styles.error}>{drugError}</Text>}
            </ScrollView>
            <View style={styles.patientTreatment}>
                <Text style={styles.titleText}>Pathologies</Text>
            </View>
            <ScrollView style={styles.scrollViewTreatment}>
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
            </ScrollView>
            <View style={styles.validateContainer}>
                <TouchableOpacity style={styles.validate}
                onPress = {handleValidateBtn}>
                    <Text style={styles.validateText}>Validate</Text>
                </TouchableOpacity>
                {isLoading && <Image source={loadingGif} style={styles.loadingGif} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        height: '100%',
    },
    selectedPatientContainer:{
        marginTop: 20,
    },
    patientNameContainer: {
        flexDirection: "row",
        alignSelf: "start"
    },
    patientName: {
        backgroundColor: 'rgba(218,218,218,0.33)',
        height: 50,
        width:150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 20,
        },
        circle: {
            width: 15,
            height: 15,
            backgroundColor: '#DE6969',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            marginTop:15,
            marginLeft: 10
          },
          patientCircle: {
            width: 20,
            height: 20,
            backgroundColor: '#DE6969',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            marginTop:65,
            marginLeft: 10
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
        marginTop: 10,
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
    scrollViewTreatment: {
        height: '75%',
    },
    error: {
        color: 'red',
        marginLeft: 20,
        marginBottom: 10,
      },
    patientNameInput: {
        backgroundColor: 'rgba(218,218,218,0.33)',
        height: 50,
        width:150,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 20,
    },
    loadingGif: {
        height: 40,
        width: 40,
        marginTop: 50,
    },
});