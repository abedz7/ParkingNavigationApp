import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const AdminDash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* Users Button */}
      <TouchableOpacity
        style={styles.adminItem}
        onPress={() => navigation.navigate('UsersPanel')}
      >
        <Ionicons name="people-outline" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.adminItemText}>Users</Text>
      </TouchableOpacity>

      {/* Parking Lots Button */}
      <TouchableOpacity
        style={styles.adminItem}
        onPress={() => navigation.navigate('ParkingLotsPanel')}
      >
        <FontAwesome5 name="warehouse" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.adminItemText}>Parking Lots</Text>
      </TouchableOpacity>

      {/* Parking Spots Button */}
      <TouchableOpacity
        style={styles.adminItem}
        onPress={() => navigation.navigate('ParkingSpotsPanel')}
      >
        <Ionicons name="car-sport-outline" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.adminItemText}>Parking Spots</Text>
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
  adminItem: {
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
  adminItemText: {
    fontSize: 18,
    color: '#3D4F5C',
  },
});

export default AdminDash;
