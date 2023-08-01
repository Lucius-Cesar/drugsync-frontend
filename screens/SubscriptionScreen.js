import {SafeAreaView, View,Text, TouchableOpacity, StyleSheet, Animated, Modal, Image} from 'react-native';
import Subscription from '../components/Subscription';
import { useState, useEffect, useRef } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        },
    screenTitleContainer:{
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },

    screenTitle: {
        fontSize: 32,
        color: "#5DA6A0"},

    textBold: {
        fontWeight: "600",
        alignSelf: "center"
    },
    subscriptionsContainer:{
        flex:5,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent:"center",
    },
    payButtonContainer:{
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },

    payButton:{
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#057B6C",
        width: 100,
        height: 45,
        alignItems: "center",
        justifyContent: "center"
    },
    payButtonText:{
        fontSize: 20,
        color: "#057B6C",
    fontWeight: "600"
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: '80%',
        height: '50%',
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        elevation: 20,
        paddingBottom: 110,
      },
      header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      modalPayBtn: {
        width: 129,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#008777',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalPayText: {
        color: '#008777',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign : 'center',
      },
      modalBtnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      payContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      payRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      payElement: {
        backgroundColor : '#E5E5E5',
        width: 92,
        height: 96,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      payImg: {
        width: 75,
        height: 50,
      },
})


const ModalPopup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);

  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if(visible){
      setShowModal(true);
      Animated.spring(scaleValue,{
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }else{
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>{children}</Animated.View>
      </View>
      
    </Modal>
    )
}


export default function SubscriptionScreen(){
    const [visible, setVisible] = useState(false)
    const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] = useState(null);

  const handleSubscriptionPress = (index) => {
    setSelectedSubscriptionIndex(index);
  };


    const subscriptionsData = [
        {
            title: "14 days trial",
            description: "FREE"
        },{
            title: "Monthly",
            description: "59,99€\nper month"
    
        },{
            title: "3 months",
            description: "54,99€\nper month"
    
    
        },{
            title: "Year",
            description: "49,99€\nper month"
        }
    
    ]

    const subscriptions = subscriptionsData.map((data, i) => {
        return (
            <TouchableOpacity
              key={i}
              onPress={() => handleSubscriptionPress(i)}
              style={
                i === selectedSubscriptionIndex
                  ? { ...styles.subscriptionItem, backgroundColor: '#82D2CB', borderRadius: 10, }
                  : styles.subscriptionItem
              }
            >
              <Subscription title={data.title} description={data.description} />
            </TouchableOpacity>
          );
       });
return(
<SafeAreaView style={styles.screen}>
    <View style = {styles.screenTitleContainer}>
        <Text style = {styles.screenTitle}>
            <Text style = {styles.textBold}>M</Text>y <Text style = {styles.textBold}>S</Text>ubscription
        </Text>
    </View>
    <View style={styles.subscriptionsContainer}>
        {subscriptions}
    </View>
    <View style= {styles.payButtonContainer}> 
        <TouchableOpacity style = {styles.payButton} onPress={() => setVisible(true)}>
            <Text style ={styles.payButtonText}>
                Pay
            </Text>
        </TouchableOpacity>
        <ModalPopup visible={visible}>
            <View style={{alignItems:'center'}}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}><FontAwesome name='times' size={20} color='#000' style={styles.deleteIcon} /></TouchableOpacity>
              </View>
            </View>
            <View style={styles.payContainer}>
            <View style={styles.payRow}>
                <TouchableOpacity style={styles.payElement}>
                    <Image source={require('../assets/apple-pay.png')} style={styles.payImg} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.payElement}>
                    <Image source={require('../assets/google-pay.png')} style={styles.payImg} />
                </TouchableOpacity>
                </View>
                <View style={styles.payRow}>
                <TouchableOpacity style={styles.payElement}>
                    <Image source={require('../assets/paypal.png')} style={styles.payImg} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.payElement}>
                    <Image source={require('../assets/credit-card.png')} style={styles.payImg} />
                </TouchableOpacity>
            </View>
            </View>
            <View style={styles.modalBtnContainer}>
            </View>
          </ModalPopup>
    </View>
  </SafeAreaView>

)
}