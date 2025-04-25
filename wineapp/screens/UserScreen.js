import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeOut } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export default function UserScreen() {
  const navigation = useNavigation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          Toast.show({
            type: 'info',
            text1: 'Logged out',
          });
    
          setIsLoggingOut(true);
          setTimeout(() => {
            navigation.navigate('Login');
          }, 300);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoggingOut ? (
        <Animated.View exiting={FadeOut.duration(300)} style={styles.content}>
          <Text style={styles.title}>User Profile</Text>
          <Text style={styles.subtext}>Welcome back, wine enthusiast!</Text>
          <TouchableOpacity onPress={confirmLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'crimson',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: 'cornsilk',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
