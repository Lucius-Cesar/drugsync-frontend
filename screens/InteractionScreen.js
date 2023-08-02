import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Interaction from '../components/Interaction';


export default function TreatmentScreen() {

    const interactionData = [
        {
            name: "Paracétamol",
        },{
            name: "Aspirin",
        },{
            name: "Tramadol",
        }
    ]
    return(
        <View style={styles.container}>
           <Text style={styles.title}>Drug Interactions</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});