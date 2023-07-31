import {SafeAreaView, View,Text, TouchableOpacity, StyleSheet} from 'react-native';
import Subscription from '../components/Subscription';

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
        justifyContent:"center"
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
    fontWeight: "600"}

})
export default function SubscriptionScreen(){
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
        return <Subscription key={i} title={data.title} description = {data.description}/>;
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
        <TouchableOpacity style = {styles.payButton}>
            <Text style ={styles.payButtonText}>
                Pay
            </Text>
        </TouchableOpacity>
    </View>
  </SafeAreaView>

)
}