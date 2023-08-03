import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import InteractionScreen from './screens/InteractionScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Redux Setup
import { Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserScreen from './screens/UserScreen';
import user from './reducers/user';
import patient from './reducers/patient';
import PatientInfoScreen from './screens/PatientInfoScreen'

const store = configureStore({
  reducer: { user, patient},
});

// Navigation setp
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'User') {
          iconName = 'user';
        }else if (route.name === 'Favorite') {
          iconName = 'star';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#5DA6A0',
      tabBarInactiveTintColor: '#163232',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Favorite" component={LoginScreen} />
    </Tab.Navigator>
);
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
 }