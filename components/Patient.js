import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


export default function Patient(props) {
    return(
        <View style = {styles.patientContainer}>

        <Text style ={styles.titleText}>
        {props.title}
        </Text>
        <TouchableOpacity style= {styles.deleteIcon}>
            <Icon name="close" size={12} color="white"/>
        </TouchableOpacity>

        </View>
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

    titleText :{
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