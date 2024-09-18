import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

const Profile = ({ route }) => {
  const { user } = route.params;  

  
  const initials = `${user.First_Name.charAt(0)}${user.Last_Name.charAt(0)}`;

  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

 
  const [avatarBackgroundColor] = useState(getRandomColor);

  
  const [showCars, setShowCars] = useState(false);
  
  
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
     
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: avatarBackgroundColor }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user.First_Name} {user.Last_Name}</Text> 
        <Text style={styles.location}>Taybe, Israel</Text>
      </View>

    
      <View style={styles.optionsContainer}>
        
        <TouchableOpacity style={styles.profileItem} onPress={() => setShowCars(!showCars)}>
          <Ionicons name="car-outline" size={24} color="#4FADF5" style={styles.icon} />
          <Text style={styles.profileItemText}>Your Cars</Text>
        </TouchableOpacity>

        
        {showCars && user.Cars.map((car, index) => (
          <View key={index} style={styles.carDetails}>
            <Text style={styles.carText}>{car.Company} {car.Model}</Text>
            <Text style={styles.carText}>License Plate: {car.License_Plate}</Text>
          </View>
        ))}

        
        <TouchableOpacity style={styles.profileItem} onPress={() => setShowPersonalInfo(!showPersonalInfo)}>
          <Ionicons name="settings-outline" size={24} color="#4FADF5" style={styles.icon} />
          <Text style={styles.profileItemText}>Personal Information</Text>
        </TouchableOpacity>

       
        {showPersonalInfo && (
          <View style={styles.personalInfo}>
            <Text style={styles.infoText}>Name: {user.First_Name} {user.Last_Name}</Text>
            <Text style={styles.infoText}>Email: {user.Email_Address}</Text>
            <Text style={styles.infoText}>Phone: {user.Phone_Number}</Text>
          </View>
        )}

        
        <TouchableOpacity style={styles.profileItem}>
          <MaterialIcons name="lock-outline" size={24} color="#4FADF5" style={styles.icon} />
          <Text style={styles.profileItemText}>Change Password</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.profileItem}
          onPress={() => alert('Logging out')}
        >
          <MaterialIcons name="logout" size={24} color="#4FADF5" style={styles.icon} />
          <Text style={styles.profileItemText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 60,  
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3D4F5C',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  optionsContainer: {
    width: '80%',  
    marginTop: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 15,
  },
  profileItemText: {
    fontSize: 18,
    color: '#3D4F5C',
  },
  carDetails: {
    paddingVertical: 10,
    paddingLeft: 40,
  },
  carText: {
    fontSize: 16,
    color: '#555',
  },
  personalInfo: {
    paddingVertical: 10,
    paddingLeft: 40,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default Profile;
