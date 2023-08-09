  import React, { useState, useEffect } from "react";
  import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    StyleSheet,
    ScrollView,
    
  } from "react-native";
  import FontAwesome from "react-native-vector-icons/FontAwesome";

  export default function PathologySearchModal({ isVisible, handleVisible, pathologySuggestions, searchTerm, drugIndications, navigation}) {

    const [modalVisible, setModalVisible] = useState(isVisible);
    console.log("searched value:", searchTerm); // Vérifiez si la valeur est correctement transmise
    console.log(pathologySuggestions)
    function handleCloseButtonPress () {
      handleVisible()
    }


    useEffect(() => {
      toggleModal();
    }, [isVisible]);

    

    const toggleModal = () => {
      if (isVisible) {
        setModalVisible(true);
      
      } else {
          setModalVisible(false);
        }
    }
    const pathologiesFound = pathologySuggestions.map((pathology, i) =>{
      function handlePathologyPress(){
        treatmentSuggestion = drugIndications.filter(e => e.efo_term === pathology)
        navigation.navigate("PatientInfo", {treatmentSuggestion: treatmentSuggestion})
      }
      return(
      <TouchableOpacity key = {i} onPress = {handlePathologyPress}>
        <Text>
          {pathology}
          
        </Text>
      </TouchableOpacity>
      )
    })


    return (
      <Modal transparent visible={modalVisible}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContainer,
            ]}
          >
            <TouchableOpacity onPress={handleCloseButtonPress}>
              <FontAwesome name="times" size={20} color="#000" />
            </TouchableOpacity>
            <View>
              <Text>
                {pathologiesFound.length} pathologies found for term {searchTerm}
              </Text>
              {pathologiesFound}

            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      elevation: 20,
    },
  });
