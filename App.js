
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import UserScreen from './screens/UserScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
 return (
   <Tab.Navigator screenOptions={{ headerShown: false }}>
     <Tab.Screen name="Home" component={SubscriptionScreen} />
     <Tab.Screen name="User" component={UserScreen} />
     <Tab.Screen name="Favorite" component={LoginScreen} />
   </Tab.Navigator>
 );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
 }


