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
    function handleCloseButtonPress () {
      handleVisible()
    }
    function handlePathologyPress(pathology){
      const treatmentSuggestion = drugIndications.filter(e => e.efo_term === pathology)
      navigation.navigate("PatientInfo", {treatmentSuggestion: treatmentSuggestion[0]})
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
      return(
      <TouchableOpacity 
      style={styles.pathologyContainer}
      key = {i} onPress = {
        () => handlePathologyPress(pathology)
        }>
        <Text style={styles.pathologyList}>
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
            <TouchableOpacity onPress={handleCloseButtonPress} style={styles.closeBtn}>
              <FontAwesome name="times" size={20} color="#000" />
            </TouchableOpacity>
            <View>
              <Text style={styles.pathologyTextContainer}>
                <Text style={styles.pathologyNumber}>{pathologiesFound.length}</Text> pathologies found for term <Text style={styles.pathologyText}>'{searchTerm}'</Text>
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
      width: "auto",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      elevation: 20,
    },
    closeBtn: {
      flexDirection: "row",
      justifyContent: 'flex-end',
      margin: 5,
    },
    pathologyText: {
      fontSize: 22,
      fontWeight: "bold",
    },
    pathologyTextContainer:{
      color: '#5DA6A0',
      fontSize: 20,
      margin: 15,
    },
    pathologyNumber: {
      fontWeight: 'bold',
    },
    pathologyContainer:{
      margin: 5,
      backgroundColor: 'rgba(229, 229, 229, 0.65)',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      height: 50,
    },
    pathologyList:{
      fontSize: 18,
    },
  });
