import { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function OpenButton(props){
    const [textVisible, setTextVisible] = useState(false);
  
    const handleToggleText = () => {
      setTextVisible(!textVisible);
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleToggleText} style={styles.button}>
            <View style={styles.btnName}>
                <FontAwesome name={'warning'} size={18} color="red" />
                <Text style={styles.buttonText}>CODEINE -- TRAMADOL</Text>
                <FontAwesome name={textVisible ? 'chevron-down' : 'chevron-right' } size={18} color="black" />
            </View>
        </TouchableOpacity>
        {textVisible && (
          <View style={styles.additionalTextContainer}>
            <Text style={styles.additionalText}>Tramadol should not be taken at the same time as codeine, because both medications are structurally similar, and the combination can result in increased drowsiness.</Text>
          </View>
        )}
      </View>
    );
  };
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
      },
      btnName:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        width: 300,
        padding: 10,
      },
      button: {
        width: 300,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'red',
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#163232',
        },
      additionalTextContainer: {
        marginTop: 0,
        backgroundColor: 'rgba(229,229,229,0.65)',
        width: 280,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
      },
      additionalText: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',
      },
});