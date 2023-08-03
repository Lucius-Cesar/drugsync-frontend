import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TreatmentSuggestion from "../components/TreatmentSuggestion";

export default function TreatmentSuggestionScreen() {
  const TreatmentSuggestiondata = [
    {
      name: "aspirin",
      description:
        "Aspirin, also known by its generic name acetylsalicylic acid, is a widely used medication that belongs to the class of drugs known as nonsteroidal anti-inflammatory drugs (NSAIDs). It is commonly used to relieve pain, reduce inflammation, and lower fever. Aspirin is available over-the-counter in various forms, including tablets, capsules, and effervescent tablets,",
    },
    {
      name: "duovent",
      description:
        "Duovent is a combination medication used for the treatment of respiratory conditions such as asthma and chronic obstructive pulmonary disease (COPD). It is classified as a bronchodilator and contains two active ingredients: ipratropium bromide and salbutamol (also known as albuterol).",
    },
    {
      name: "vitamine C",
      description:
        "Vitamin C, also known as ascorbic acid, is a water-soluble vitamin that plays a crucial role in supporting various essential functions in the human body. It is considered an essential nutrient because our bodies cannot produce it, so we must obtain it from our diet or supplements.",
    },
  ];
  const treatments = TreatmentSuggestiondata.map((data, i) => {
    return (
      <TreatmentSuggestion
        key={i}
        name={data.name}
        description={data.description}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.Text}> Polyarthrite Rhumatoïde </Text>
      </View>

      <ScrollView>{treatments}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
    borderWidth: 4,
    borderColor: "#008777",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "008777",
    color: "white",
  },
  view: {
    backgroundColor: "008777",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
});
