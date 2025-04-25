import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import HomeScreen from './screens/HomeScreen';
import CellarScreen from './screens/CellarScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen'; // Import your LoginScreen component
import { WineProvider } from './context/WineContext';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cellar') {
            iconName = 'wine';
          } else if (route.name === 'User') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: 'cornsilk',
        },
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
  try {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <WineProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main" component={MainTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </WineProvider>
      </GestureHandlerRootView>
    );
  } catch (e) {
    console.error('App Error:', e);
    return <Text>Error loading app.</Text>;
  }
}