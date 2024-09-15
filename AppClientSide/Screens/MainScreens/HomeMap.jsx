import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import Parkings from '../MainScreens/Parkings';
import Screen19 from '../MainScreens/Screen19';
import Profile from '../MainScreens/Profile';
import ParkingIcon from '../../Components/ParkingIcon';

const Tab = createBottomTabNavigator();

const LocationScreen = ({ navigation }) => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          <Marker
            coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }}
            title="You Are Here"
          />
          <ParkingIcon
            coordinate={{ latitude: initialRegion.latitude + 0.001, longitude: initialRegion.longitude + 0.001 }}
            parkingLotName="Ruppin Academic Centre"
          />
        </MapView>
      ) : (
        <View style={styles.centered}>
          {errorMsg ? (
            <Text>{errorMsg}</Text>  
          ) : (
            <ActivityIndicator size="large" color="#6FADF5" />
          )}
        </View>
      )}
      <IconButton
        icon="menu"
        size={30}
        onPress={() => navigation.openDrawer()}
        style={styles.menuButton}
      />
    </View>
  );
};

function HomeTabs({ user }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Location') {
            iconName = 'map-marker';
          } else if (route.name === 'Parkings') {
            iconName = 'car';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6FADF5',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Parkings" component={Parkings} options={{ headerShown: false }}/>            
      <Tab.Screen name="Notifications" component={Screen19} options={{ headerShown: false }} />
      <Tab.Screen
        name="Profile"
        component={Profile} // Properly pass the Profile component
        initialParams={{ user }}  // Pass user as initial params
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const HomeMap = ({ route }) => {
  const { user } = route.params; // Get user data from login

  return (
    <View style={styles.container}>
      <HomeTabs user={user} />  {/* Pass user data to HomeTabs */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeMap;
