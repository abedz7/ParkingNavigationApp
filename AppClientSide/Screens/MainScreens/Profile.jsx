import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>

        <View style={styles.userInfo}>
          <Image source={require('../assets/images/abed.jpg')} style={styles.avatar} />
          <Text style={styles.name}>Abed Jaber</Text>
          <Text style={styles.location}>Taybe, Israel</Text>
        </View>


        <View style={styles.profileItems}>
          <TouchableOpacity style={styles.profileItem}>
            <Ionicons name="car-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.profileItemText}>Your Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileItem}>
            <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.profileItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileItem}>
            <MaterialIcons name="people-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.profileItemText}>Tell Your Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileItem}>
            <FontAwesome name="sign-out" size={24} color="black" style={styles.icon} />
            <Text style={styles.profileItemText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Center vertically
  },
  contentContainer: {
    alignItems: 'center',  // Center horizontally
  },
  // ... (other styles)
  userInfo: {
    alignItems: 'center',
    marginBottom: 40, // Increased margin for more spacing
  },
  avatar: {
    width: 120, // Made avatar bigger
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22, // Increased font size
    fontWeight: 'bold',
    marginTop: 10,
  },
  location: {
    fontSize: 18, // Increased font size
    color: '#888',
  },
  profileItems: {
    width: '80%', // Make the width of the items smaller
  },
  profileItem: {
    marginBottom: 20,  // Increased spacing
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
    flexDirection: 'row',  // Arrange icon and text horizontally
    alignItems: 'center', // Center items vertically
  },
  profileItemText: {
    fontSize: 18, // Increased font size
  },
  icon: {
    marginRight: 15, // Increased spacing
  },
});

export default Profile;
