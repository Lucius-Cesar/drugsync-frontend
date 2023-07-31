import {View, Text, StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 10,
        backgroundColor: "#008777",
        height: 220,
        width: 150,
        margin: 10,
        
      },
      titleContainer:{
        flex:1,
        justifyContent: "center",
        alignItems:"center"
      },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
        margin: 10
      },
      descriptionText: {
        color: "white",
        textAlign:"center",
        fontWeight:"500",
        fontSize: 16
      },
      descriptionContainer:{
        flex:4,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }
}
)


export default function Subscription(props){
return(    
<View style = {styles.container}>
    <View style = {styles.titleContainer}>
    <Text style = {styles.title}>
        {props.title}
    </Text>
    </View>

    <View  style = {styles.descriptionContainer}>
        <Text style = {styles.descriptionText}>
            {props.description}
        </Text>
    </View>
</View>
)
}