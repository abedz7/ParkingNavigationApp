import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Profile = ({ route }) => {
  const { user } = route.params;  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.name}>{user.First_Name} {user.Last_Name}</Text> 
      <Text style={styles.email}>{user.Email_Address}</Text>  
      <Text style={styles.phone}>{user.Phone_Number}</Text>  

      <View style={styles.profileItems}>
        <TouchableOpacity style={styles.profileItem}>
          <Ionicons name="car-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.profileItemText}>Your Cars</Text>
        </TouchableOpacity>
        {user.Cars.map((car, index) => (
          <View key={index} style={styles.carDetails}>
            <Text style={styles.carText}>{car.Company} {car.Model}</Text>
            <Text style={styles.carText}>License Plate: {car.License_Plate}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.profileItem}>
          <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.profileItemText}>Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileItem}>
          <MaterialIcons name="lock-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.profileItemText}>Change Password</Text>
        </TouchableOpacity>

        <View style={styles.profileItem}>
          <MaterialIcons name="accessible" size={24} color="black" style={styles.icon} />
          <Text style={styles.profileItemText}>Disabled Certificate: {user.HaveDisabledCertificate ? 'Yes' : 'No'}</Text>
        </View>

        <View style={styles.profileItem}>
          <MaterialIcons name="child-care" size={24} color="black" style={styles.icon} />
          <Text style={styles.profileItemText}>Is Mom: {user.IsMom ? 'Yes' : 'No'}</Text>
        </View>

        <TouchableOpacity style={styles.profileItem} onPress={() => Alert.alert('Logging out')}>
          <FontAwesome name="sign-out" size={24} color="black" style={styles.icon} />
          <Text style={styles.profileItemText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  profileItems: {
    width: '100%',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  carDetails: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  carText: {
    fontSize: 16,
    color: '#555',
  },
  profileItemText: {
    fontSize: 18,
    marginLeft: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default Profile;
