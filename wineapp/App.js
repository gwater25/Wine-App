import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import HomeScreen from './screens/HomeScreen';
import CellarScreen from './screens/CellarScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';
import WineDetailScreen from './screens/WineDetailScreen';
import AddWineScreen from './screens/AddWineScreen';
import InventoryReportScreen from './screens/InventoryReportScreen';
import { WineProvider } from './context/WineContext';
import { WineInventoryProvider, useInventory } from './context/WineInventoryContext';

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

function AppWrapper() {
  const { wines } = useInventory();

  useEffect(() => {
    const checkLowStock = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission not granted for notifications');
        return;
      }

      const winesLowStock = wines.filter(wine => (wine.stock ?? 0) < 3);

      if (winesLowStock.length > 0) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '⚠️ Low Stock Alert',
            body: `You have ${winesLowStock.length} wine(s) low in stock!`,
          },
          trigger: null,
        });
      }
    };

    checkLowStock();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="WineDetail" component={WineDetailScreen} />
        <Stack.Screen name="AddWine" component={AddWineScreen} />
        <Stack.Screen name="InventoryReport" component={InventoryReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WineInventoryProvider>
        <WineProvider>
          <AppWrapper />
          <Toast />
        </WineProvider>
      </WineInventoryProvider>
    </GestureHandlerRootView>
  );
}