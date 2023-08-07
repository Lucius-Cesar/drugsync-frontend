import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  handlePress,
} from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";

export default function UserScreen({ navigation }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout);
    navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../assets/raoult.jpg")}
          style={styles.profil}
        ></Image>
        <Text style={styles.userName}>Dr. Raoult</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Subscription")}
          style={styles.buttonSubscription}
        >
          <Text style={styles.subscriptionText}> 1 Year Subscription </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>vraimedecin@gmail.com</Text>
        <TouchableOpacity style={styles.editBtn}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>●●●●●●●●●</Text>
        <TouchableOpacity style={styles.editBtn}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>+33612345678</Text>
        <TouchableOpacity style={styles.editBtn}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonHelp}>
        <Text style={styles.subscriptionText}> Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOut} onPress={handleLogout}>
        <Text style={styles.subscriptionText}> Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactBtn}>
        <Text style={styles.contactText}>Contact us</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  userContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  userName: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  profil: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderColor: "#008777",
    borderWidth: 2,
  },
  buttonSubscription: {
    borderRadius: 10,
    backgroundColor: "#008777",
    width: 270,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  subscriptionText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 20,
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  info: {
    width: 250,
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
  },
  text: {
      fontSize: 18,
    },
  editBtn: {
    marginRight: 20,
  },
  editText:{
    color: "#057B6C",
    textDecorationLine: "underline",
    fontSize: 20, 
  },
  buttonHelp: {
    borderRadius: 10,
    backgroundColor: "008777",
    width: 250,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonOut: {
    borderRadius: 10,
    backgroundColor: "#DE6969",
    width: 210,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  contactBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  contactText: {
      color: "#82D2CB",
      fontSize: 16,
      textAlign: "center",
      textDecorationLine: "underline",
    },
});
