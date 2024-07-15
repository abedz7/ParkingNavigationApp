import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import Screen16 from '../Screens/Screen16'; // Parkings Screen
import Screen19 from '../Screens/Screen19'; // Notifications Screen
import Screen20 from '../Screens/Screen20'; // Profile Screen
import ParkingIcon from '../Components/ParkingIcon'; // Import the ParkingIcon component
import { Marker } from 'react-native-maps';

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
          <Text>{errorMsg ? errorMsg : 'Loading...'}</Text>
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

function HomeTabs() {
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
      <Tab.Screen name="Parkings" component={Screen16} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={Screen19} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Screen20} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const Screen15 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HomeTabs />
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

export default Screen15;