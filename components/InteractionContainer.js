import {View,Text, StyleSheet, ScrollView } from 'react-native';
import TreatmentLight from './TreatmentLight';

export default function InteractionContainer(props){
    const treatmentData = [
        {
            name: "Paracétamol",
        },{
            name: "Codeine",
        },{
            name: "Tramadol",
        }
    ]
    const treatment = treatmentData.map((data, i) => {
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
});