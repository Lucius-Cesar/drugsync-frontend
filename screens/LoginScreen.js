import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

export default function LoginScreen({ navigation }){
return(
<View style={styles.container}> 
    <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logoImg}></Image>
        <Text style={styles.logoTitle}>DrugSync</Text>
    </View>
    <View style={styles.inputContainer}>
        <TextInput placeholder='Email'></TextInput>
        <TextInput placeholder='Password'></TextInput>
    </View>
    <View style={styles.btnContainer}>
        <Button
            title="Login"
            onPress={() => navigation.navigate('TabNavigator')}
        />
        <Button
            title="Signup"
       />
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
        marginBottom: 200,
      },
      btnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
    logoTitle: {
      fontFamily: 'Roboto',
      fontSize: 28,
      color: '#5DA6A0',
    },
    logoImg: {
        width: 173,
        height: 180,
      },
  });
