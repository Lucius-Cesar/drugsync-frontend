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

  export default function PathologySearchModal({ isVisible, handleVisible, pathologySuggestions, searched, drugIndications}) {
    const [modalVisible, setModalVisible] = useState(isVisible);
    console.log("searched value:", searched); // Vérifiez si la valeur est correctement transmise
    console.log(pathologySuggestions)
    function handleOnPress () {
      handleVisible()
    }

    useEffect(() => {
      toggleModal();
    }, [isVisible]);

    useEffect(() => {
      if (pathologySuggestions.length) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    }, [pathologySuggestions]);

    const toggleModal = () => {
      if (isVisible) {
        setModalVisible(true);
      
      } else {
          setModalVisible(false);
        }
    }
    const pathologiesFound = pathologySuggestions.map((pathology, i) =>{
      return(
      <TouchableOpacity key = {i}>
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
            <TouchableOpacity onPress={handleOnPress}>
              <FontAwesome name="times" size={20} color="#000" />
            </TouchableOpacity>
            <View>
              <Text>
                {pathologiesFound.length} pathologies found for term {searched}
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
