import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { removePathology } from '../reducers/patient';
import {useDispatch} from 'react-redux'



export default function Pathology (props){
    //redux
    const dispatch = useDispatch()

    function handleRemovePathologyButton(){
        console.log(props.name)
        dispatch(removePathology(props.name))
        //Later: makes changes actives in the patient collection
    }

    return(    

    <View style = {styles.container}>
        <View style = {styles.textContainer}>
            <Text style={styles.textTreatment}>
                {props.name}
            </Text>
        </View>
        <TouchableOpacity style={styles.circle} onPress = {handleRemovePathologyButton}>
            <FontAwesome name='times' size={12} color={'white'} />
        </TouchableOpacity>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 10,
    },
    textContainer: {
        width: 180,
        height: 55,
        backgroundColor: 'rgba(218, 218, 218, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
    },
    textTreatment:{
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        backgroundColor: '#DE6969',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
      },
});