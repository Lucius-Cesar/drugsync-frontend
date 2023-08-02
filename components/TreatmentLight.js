import {View, Text, StyleSheet, TouchableOpacity,TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function TreatmentLight(props){
    
    return(   
        <View style = {styles.container}>
            <View style = {styles.textContainer}>
                <Text style={styles.textTreatment}>
                    {props.name}
                </Text>
            </View>
            <TouchableOpacity style={styles.circle}>
                <FontAwesome name='times' size={8} color={'white'} />
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
        width: 'auto',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 5,
    },
    textTreatment:{
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
    },
    circle: {
        width: 15,
        height: 15,
        backgroundColor: '#DE6969',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
      },
});