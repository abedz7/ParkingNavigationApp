import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ParkingLotsPanel = ({ navigation }) => {
  const getAllParkingLots = () => {
    console.log("Fetching all parking lots...");
  };

  const addParkingLot = () => {
    console.log("Adding a new parking lot...");
  };

  const updateParkingLot = () => {
    console.log("Updating parking lot...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Lots Management</Text>

      <TouchableOpacity style={styles.actionItem} onPress={getAllParkingLots}>
        <Ionicons name="business-outline" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.actionText}>View All Parking Lots</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionItem} onPress={addParkingLot}>
        <Ionicons name="add-circle-outline" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.actionText}>Add New Parking Lot</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionItem} onPress={updateParkingLot}>
        <MaterialIcons name="edit-location" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.actionText}>Update Parking Lot</Text>
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

export default ParkingLotsPanel;
