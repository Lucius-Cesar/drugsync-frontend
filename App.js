import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import PatientsScreen from './screens/PatientsScreen';

// Redux Setup
import { Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserScreen from './screens/UserScreen';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});

// Navigation setp
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
 return (
   <Tab.Navigator screenOptions={{ headerShown: false }}>
     <Tab.Screen name="Home" component={SubscriptionScreen} />
     <Tab.Screen name="User" component={UserScreen} />
     <Tab.Screen name="Patients" component={PatientsScreen} />
   </Tab.Navigator>
 );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Patient" component={PatientsScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
 }