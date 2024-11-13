import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ParkingSpotsPanel = ({ navigation }) => {
  const getAllParkingSpots = () => {
    console.log("Fetching all parking spots...");
  };

  const addMultipleParkingSpots = () => {
    console.log("Adding multiple parking spots...");
  };

  const updateParkingSpot = () => {
    console.log("Updating parking spot...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Spots Management</Text>

      <TouchableOpacity style={styles.actionItem} onPress={getAllParkingSpots}>
        <Ionicons name="car-outline" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.actionText}>View All Parking Spots</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionItem} onPress={addMultipleParkingSpots}>
        <Ionicons name="add-circle-outline" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.actionText}>Add Multiple Parking Spots</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionItem} onPress={updateParkingSpot}>
        <MaterialIcons name="edit-location" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.actionText}>Update Parking Spot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3D4F5C',
    marginBottom: 30,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '80%',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 15,
  },
  actionText: {
    fontSize: 18,
    color: '#3D4F5C',
  },
});

export default ParkingSpotsPanel;
