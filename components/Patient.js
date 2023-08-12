import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux';
import { loadPatientInfo} from '../reducers/patient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Patient(props) {
    const dispatch = useDispatch()
    function handlePatientPress (){
        fetch(`https://drugsync-backend.vercel.app/patients/${props.name}`)
        .then(response => response.json())
        .then(data => {
            data.infoPatients.currentTreatment = data.infoPatients.currentTreatment.map(treatment => {
                
                return {
                    name: treatment.name,                 
                    rxcui: treatment.rxNav[0].rxcui           
                };
            });
            
            dispatch(loadPatientInfo(data.infoPatients))
            props.navigation.navigate("Home")
        })
    }

    function handleDeletePatient(){
        fetch(`https://drugsync-backend.vercel.app/patients/deletePatient/${props.name}`,
        {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(
            data => { 
                if(data.delete){
                console.log(`Patient ${props.name} deleted`)
            }
            else{
                console.log(`Error during patient delete ${props.name}`)
            }
        }
        )
        props.onDeletePatient(props.name)
    }

    return(
        <>
        <View style={styles.container}>
        <TouchableOpacity style = {styles.patientContainer} onPress = {handlePatientPress}>
        <Text style ={styles.nameText}>
        {props.name}
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circle} onPress = {handleDeletePatient}>
        <FontAwesome name='times' size={15} color={'white'} />
        </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    patientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: 300
    },

    nameText :{
        fontSize: 16,
        marginLeft: 100,
  
    },
    circle: {
        width: 20,
        height: 20,
        backgroundColor: '#DE6969',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 10,
      },
  
  })