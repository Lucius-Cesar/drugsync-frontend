import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../reducers/user'
import {Animated, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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


export default function LoginScreen({ navigation }){

  const dispatch = useDispatch();

  //login states
  const [visible, setVisible] = useState(false)
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

   //sign Up states
   const [signUpEmail, setSignUpEmail] = useState('')
   const [signUpFirstName, setSignUpFirstName] = useState('')
   const [signUpLastName, setSignUpLastName] = useState('')
   const [signUpPassword, setsignUpPassword] = useState('')
   const [signUpAdress, setSignUpAdress] = useState('')
   const [signUpProfession, setSignUpProfession] = useState('')

  // Detect email incorrect format
  const [emailError, setEmailError] = useState(false);
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  function handleLoginButton(){
    const emailExample = "didierraoult@chumarseille.com"
    const passwordExample = "hydroxychloroquine"

    if(EMAIL_REGEX.test(signInEmail)){
      if(signInEmail === emailExample && signInPassword === passwordExample){

        dispatch(login({ email: signInEmail, token: "tokenAuPif" }));   
        navigation.navigate('TabNavigator')
        console.log("Didier raoult is connected")
        setSignInEmail("")
        setSignInPassword("")
        }
        else{
          console.log("it is not didier")
        }
      }
    else{
      setEmailError(true);
    }
  }

  function handleCreateAccountButton(){
    if(EMAIL_REGEX.test(signInEmail)){
      dispatch(login({ email: signUpEmail, token: "tokenAuPif" }));   
      console.log(`${signUpFirstName} ${signUpLastName} account is now created and logged in`)
      setSignUpEmail("")    
      setSignUpLastName("")
      setsignUpPassword("")
      setSignUpAdress("")
      setSignUpProfession("")
      setVisible(false)
      navigation.navigate('TabNavigator')
    }
    else{
      setEmailError(true);
    }
  }

return(
<View style={styles.container}>
    <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logoImg}></Image>
        <Text style={styles.logoTitle}>DrugSync</Text>
    </View>
    <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Email' 
          placeholderTextColor="rgba(0,0,0,0.5)" 
          style={styles.inputMail} 
          onChangeText = {value => setSignInEmail(value)}
          value = {signInEmail}
        ></TextInput>
    
        {emailError && <Text style={styles.error}>Invalid email address</Text>}

        <TextInput 
          placeholder='Password' 
          placeholderTextColor="rgba(0,0,0,0.5)" 
          style={styles.inputPassword} 
          onChangeText = {value => setSignInPassword(value)}
          value = {signInPassword}>
        </TextInput>
    </View>
    <View style={styles.btnContainer}>
    <TouchableOpacity style={styles.loginBtn} onPress={() => handleLoginButton()}>
          <Text style={styles.loginTextBtn}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createBtn}>
        <ModalPopup visible={visible}>
            <View style={{alignItems:'center'}}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}><FontAwesome name='times' size={20} color='#000' style={styles.deleteIcon} /></TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.modalText}>Firstname</Text>
              <TextInput 
                style={styles.modalInput}
                onChangeText = {value => setSignUpFirstName(value)}
                value = {signUpFirstName}>
              </TextInput>
              <Text style={styles.modalText}>Lastname</Text>
              <TextInput 
                style={styles.modalInput}
                onChangeText = {value => setSignUpLastName(value)}
                value = {signUpLastName}>
              </TextInput>
              <Text style={styles.modalText}>Mail</Text>
              <TextInput 
                style={styles.modalInput}
                onChangeText = {value => setSignUpEmail(value)}
                value = {signUpEmail}>
              </TextInput>
              {emailError && <Text style={styles.error}>Invalid email address</Text>}
              <Text style={styles.modalText}>Password</Text>
              <TextInput 
                style={styles.modalInput}
                onChangeText = {value => setsignUpPassword(value)}
                value = {signUpPassword}>
              </TextInput>
              <Text style={styles.modalText}>Adress</Text>
              <TextInput 
                style={styles.modalInput}
                onChangeText = {value => setSignUpAdress(value)}
                value = {signUpAdress}>
              </TextInput>
              <Text style={styles.modalText}>Profession</Text>
              <TextInput 
                style={styles.modalInput}
                onChangeText = {value => setSignUpProfession(value)}
                value = {signUpProfession}>
              </TextInput>
            </View>
            <View style={styles.modalBtnContainer}>
            <TouchableOpacity 
              style={styles.modalCreateBtn} 
              onPress={() => handleCreateAccountButton()}>
              <Text style={styles.modalCreateText}>Create</Text>
            </TouchableOpacity>
            </View>
          </ModalPopup>
          <Text style={styles.createTextBtn} onPress={() => setVisible(true)}>Sign Up</Text>
        </TouchableOpacity>
    </View>
</View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
      },
      btnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
      },
    logoTitle: {
      fontFamily: 'Roboto',
      fontSize: 40,
      color: '#5DA6A0',
    },
    logoImg: {
        width: 173,
        height: 180,
      },
    inputMail: {
      marginBottom: 10,
      backgroundColor: 'rgba(229,229,229,0.65)',
      width: 300,
      height: 40,
      borderRadius: 10,
      textAlign: 'center',
    },
    inputPassword: {
      marginBottom: 10,
      backgroundColor: 'rgba(229,229,229,0.65)',
      width: 300,
      height: 40,
      borderRadius: 10,
      textAlign: 'center',
    },
    loginBtn: {
      marginBottom: 10,
      backgroundColor: '#008777',
      width: 240,
      height: 56,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    },
    createBtn: {
      marginBottom: 10,
      backgroundColor: '#008777',
      width: 240,
      height: 38,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    },
    loginTextBtn: {
      color: 'white',
      fontSize: 22,
    },
    createTextBtn: {
      color: 'white',
      fontSize: 18,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    modalContainer: {
      width: '80%',
      height: '80%',
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
    modalInput: {
      width: 250,
      height: 30,
      backgroundColor: '#E5E5E5',
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#D4D4D4',
      textAlign: 'center',
    },
    modalText: {
      fontSize: 18,
      color: '#5DA6A0',
    },
    modalCreateBtn: {
      width: 129,
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#008777',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCreateText: {
      color: '#008777',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign : 'center',
    },
    modalBtnContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    error: {
      margin: 10,
      color: 'red',
    }
  });
