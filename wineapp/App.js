import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CellarScreen from './screens/CellarScreen';
import UserScreen from './screens/UserScreen';
import WineDetailScreen from './screens/WineDetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { WineProvider } from './context/WineContext';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Home' ? 'home' :
                         route.name === 'Cellar' ? 'wine' :
                         'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: 'cornsilk' },
        tabBarActiveTintColor: 'crimson',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cellar" component={CellarScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WineProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="WineDetail" component={WineDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </WineProvider>
    </GestureHandlerRootView>
  );
}