import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function HomeScreen({ navigation }) {

    //fetch error message
    const [drugError, setDrugError] = useState(false);

    //Drug/Pathology Buttons hook
    const [isDrugActive, setDrugActive] = useState(true);
    //Checkboxes hook
    const [isOption1Active, setOption1Active] = useState(true);
    const [isOption2Active, setOption2Active] = useState(true);
    const [isOption3Active, setOption3Active] = useState(true);
    const [isOption4Active, setOption4Active] = useState(true);

    //search Input state
    const[searchInputValue, setSearchInputValue] = useState("")
  
    const handleDrugButtonPress = () => {
      setDrugActive(true);
    };
  
    const handlePathologyButtonPress = () => {
      setDrugActive(false);
    };

    
    const handleOption1Press = () => {
        setOption1Active(!isOption1Active);
    };

    const handleOption2Press = () => {
        setOption2Active(!isOption2Active);
    };

    const handleOption3Press = () => {
        setOption3Active(!isOption3Active);
    };

    const handleOption4Press = () => {
        setOption4Active(!isOption4Active);
    }


    const handleSearchBtn = () => {
      setDrugError(false);
      if(isDrugActive){
        fetch("https://drugsync-backend.vercel.app/drugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            drug: searchInputValue,
          }),
      })
      .then(response => response.json())
      .then(data => {
        if(data.result){
          //Later: check if a patient preset has been already selected, if yes => navigate directly to InteractionScreen
          navigation.navigate("PatientInfo", {searchedDrugData:data.drugData})
        }
        else{
          console.log(data.error)
          setDrugError(data.error);
        }
      })
      }}
  
    return (
      <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode='contain'/>
        <View style={styles.searchContainer}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.drugButton, isDrugActive ? styles.activeButton : null]} onPress={handleDrugButtonPress}>
                    <Text style={styles.btnText}>Drug</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pathologyButton,!isDrugActive ? styles.activeButton : null,]} onPress={handlePathologyButtonPress}>
                    <Text style={styles.btnText}>Pathology</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput placeholder='Search' 
                placeholderTextColor="rgba(0,0,0,0.5)" 
                style={styles.searchInput}
                onChangeText = {value => setSearchInputValue(value)}
                value = {searchInputValue} />
                <FontAwesome name='search' size={20} color='#000' style={styles.searchIcon} />
            </View>
            {drugError && <Text style={styles.error}>{drugError}</Text>}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.searchBtn} 
                onPress = {handleSearchBtn}>
                    <Text style={styles.btnText}>Search</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.interactions}>Interactions to highlight</Text>
            <View style={styles.filterContainer}>
                <View style={styles.filterCheck}>
                    <TouchableOpacity style={[styles.filterBtn,isOption1Active ? styles.unknown : null,]}onPress={handleOption1Press}>
                        <FontAwesome name="check" size={20} color={isOption1Active ? '#fff' : 'rgba(255,255,255,0)'}></FontAwesome>
                    </TouchableOpacity>
                    <Text style={styles.filterText}>Unknown</Text>
                </View>
                <View style={styles.filterCheck}>
                    <TouchableOpacity style={[styles.filterBtn,isOption2Active ? styles.minor : null,]} onPress={handleOption2Press}>
                        <FontAwesome name="check" size={20} color={isOption2Active ? '#fff' : 'rgba(255,255,255,0)'}></FontAwesome>
                    </TouchableOpacity>
                    <Text style={styles.filterText}>Minor</Text>
                </View>
                <View style={styles.filterCheck}>
                    <TouchableOpacity style={[styles.filterBtn,isOption3Active ? styles.moderate : null,]}onPress={handleOption3Press}>
                        <FontAwesome name="check" size={20} color={isOption3Active ? '#fff' : 'rgba(255,255,255,0)'}></FontAwesome>
                    </TouchableOpacity>
                    <Text style={styles.filterText}>Moderate</Text>
                </View>
                <View style={styles.filterCheck}>
                    <TouchableOpacity style={[styles.filterBtn,isOption4Active ? styles.major : null,]}onPress={handleOption4Press}>
                        <FontAwesome name="check" size={20} color={isOption4Active ? '#fff' : 'rgba(255,255,255,0)'}></FontAwesome>
                    </TouchableOpacity>
                    <Text style={styles.filterText}>Major</Text>
                </View>
            </View>
        </View>
      </View>
    );
    }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
    },
      logo: {
        width: 80,
        height: 80,
        marginTop: 100,
        marginBottom: 100,
      },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    drugButton: {
      width: 172,
      height: 63,
      backgroundColor: 'rgba(218,218,218,0.33)',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    pathologyButton: {
      width: 172,
      height: 63,
      backgroundColor: 'rgba(218,218,218,0.33)',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
    },
    activeButton: {
      backgroundColor: '#88D4B7',
    },
    btnText: {
        fontSize: 20,
        },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        backgroundColor: 'rgba(229,229,229,0.65)',
        width: 322,
        height: 62,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    searchIcon: {
    position: 'absolute',
    left: 280,
    top: 20,
    color: 'rgba(0,0,0,0.5)',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBtn: {
        backgroundColor: '#88D4B7',
        width: 140,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderWidth: 2,
        borderColor: '#163232'
    },
    filterContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    filterBtn: {
        width: 30,
        height: 30,
        backgroundColor: 'rgba(218,218,218,0.33)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      unknown: {
        backgroundColor: '#464646',
      },
      minor: {
        backgroundColor: '#88D4B7',
      },
      moderate: {
        backgroundColor: '#CFA350',
      },
      major: {
        backgroundColor: '#DE6969',
      },
    filterCheck: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    interactions: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#163232',
        textAlign: 'center',
        marginTop: 50,
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginTop: 10,
    },
  })