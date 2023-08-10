import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux';
import { loadPatientInfo} from '../reducers/patient';

export default function Patient(props) {
    const dispatch = useDispatch()
    function handlePatientPress (){
        fetch(`https://drugsync-backend.vercel.app/patients/${props.name}`)
        .then(response => response.json())
        .then(data => {
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
                console.log(data)
                if(data.delete){
                console.log(`Patient ${props.name} deleted`)
            }
            else{
                console.log(`Error during patient delete ${props.name}`)
            }
        }
        )
    }

    return(
        <TouchableOpacity style = {styles.patientContainer} onPress = {handlePatientPress}>

        <Text style ={styles.nameText}>
        {props.name}
        </Text>
        <TouchableOpacity style= {styles.deleteIcon} onPress = {handleDeletePatient}>
            <Icon name="close" size={12} color="white"/>
        </TouchableOpacity>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

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
    deleteIcon: {
        padding: 5,
        //marginLeft: 90,
        //width: 20,
        //height: 20,
        backgroundColor: '#DE6969',
        borderRadius: 10,
    },
  
  })