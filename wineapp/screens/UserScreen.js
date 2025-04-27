import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function UserScreen() {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate('Login');

    Toast.show({
      type: 'info',
      text1: 'You have been logged out.',
      position: 'bottom',
    });
  };

  return (
    <View style={styles.userContainer}>
      <Text style={{ fontWeight: 'bold' }}>User Screen</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('InventoryReport')} style={styles.reportButton}>
      <Text style={styles.reportButtonText}>View Inventory Report</Text>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 35,
    backgroundColor: 'crimson',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'cornsilk',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  reportButton: {
    marginTop: 15,
    backgroundColor: 'cornsilk',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  
  reportButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});