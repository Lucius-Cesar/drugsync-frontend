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

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.profil}
        ></Image>
        <Text style={styles.userName}>Raoul</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Subscription")}
          style={styles.buttonSubscription}
        >
          <Text style={styles.subscriptionText}> 1 Year Subscription </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoUser}>
        <View style={styles.infosView}>
          <Text style={styles.infos}> Mails</Text>
          <Button style={styles.buttonEdit} title="Edits" />
        </View>
        <View style={styles.infosView}>
          <Text style={styles.infos}> password </Text>
          <Button style={styles.buttonEdit} title="Edits" />
        </View>
        <View style={styles.infosView}>
          <Text style={styles.infos}> number</Text>
          <Button style={styles.buttonEdit} title="Edits" />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonHelp}>
        <Text style={styles.subscriptionText}> Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOut}>
        <Text style={styles.subscriptionText}> Log Out</Text>
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
    padding: 20,
    marginBottom: 200,
  },

  userName: {
    fontSize: 16,
    color: "black",
    marginTop: 15,
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
    borderColor: "#008777",
    borderWidth: 2,
    backgroundColor: "#008777",
    width: 270,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -170,
  },
  subscriptionText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  infoUser: {
    flex: 1,
    marginTop: -120,
  },
  infos: {
    fontSize: 20,
    marginRight: 200,
    color: "black",
  },
  infosView: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
  },
  buttonEdit: {},
  buttonHelp: {
    borderRadius: 10,
    borderColor: "#008777",
    borderWidth: 2,
    backgroundColor: "#008777",
    width: 250,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOut: {
    borderRadius: 10,
    borderColor: "red",
    backgroundColor: "red",
    width: 210,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
