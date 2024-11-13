import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Animated, PanResponder } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import Parkings from '../MainScreens/Parkings';
import Screen19 from '../MainScreens/Screen19';
import Profile from '../MainScreens/Profile';

const Tab = createBottomTabNavigator();

const LocationScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);
  const [spotCounts, setSpotCounts] = useState({ Regular: 0, Mother: 0, DisabledPerson: 0 });
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setDeviceLocation({ latitude, longitude });

      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      fetchParkingLots();
    })();
  }, []);

  const fetchParkingLots = async () => {
    try {
      const response = await fetch('https://spotcker.onrender.com/api/ParkingLots/getAllParkingLots');
      if (!response.ok) throw new Error('Failed to fetch parking lots');
      const data = await response.json();
      setParkingLots(data.parkingLots || []);
    } catch (error) {
      console.error(error);
      setErrorMsg('Could not load parking lots');
    }
  };

  const handleMarkerPress = async (parkingLot) => {
    setSelectedParkingLot(parkingLot);
    try {
      const response = await fetch(`https://spotcker.onrender.com/api/ParkingSpots/getParkingSpotsByLotName/${parkingLot.Name}`);
      const data = await response.json();
      if (data.spots) {
        const counts = data.spots.reduce(
          (acc, spot) => {
            acc[spot.Spot_Type] = (acc[spot.Spot_Type] || 0) + 1;
            return acc;
          },
          { Regular: 0, Mother: 0, DisabledPerson: 0 }
        );
        setSpotCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    }
  };

  const slideResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: slideAnim }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      if (slideAnim._value > 150) {      
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: false
        }).start();
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: false
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
        >
          {deviceLocation && (
            <Marker
              coordinate={deviceLocation}
              title="You Are Here"
            />
          )}

          {Array.isArray(parkingLots) && parkingLots.map((parkingLot, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parkingLot.Latitude_Location,
                longitude: parkingLot.Longitude_Location,
              }}
              onPress={() => handleMarkerPress(parkingLot)}
            >
              <View style={styles.customMarker}>
                <Text style={styles.markerText}>P</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      ) : (
        <View style={styles.centered}>
          {errorMsg ? <Text>{errorMsg}</Text> : <ActivityIndicator size="large" color="#6FADF5" />}
        </View>
      )}
      <IconButton
        icon="menu"
        size={30}
        onPress={() => navigation.openDrawer()}
        style={styles.menuButton}
      />

      {selectedParkingLot && (
        <View style={styles.bottomSheet}>
          <TouchableOpacity onPress={() => setSelectedParkingLot(null)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.bottomSheetTitle}>{selectedParkingLot.Name}</Text>
          <Text style={styles.bottomSheetText}>
            Latitude: {selectedParkingLot.Latitude_Location.toFixed(6)}
          </Text>
          <Text style={styles.bottomSheetText}>
            Longitude: {selectedParkingLot.Longitude_Location.toFixed(6)}
          </Text>
          <Text style={styles.spotCountText}>Regular Spots: {spotCounts.Regular}</Text>
          <Text style={styles.spotCountText}>Mother Spots: {spotCounts.Mother}</Text>
          <Text style={styles.spotCountText}>Disabled Person Spots: {spotCounts.DisabledPerson}</Text>
          
         
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.slideContainer}>
            <Text style={styles.slideButtonTextStatic}>Slide to Reserve</Text>
            <Animated.View
              {...slideResponder.panHandlers}
              style={[styles.slidingCircle, { transform: [{ translateX: slideAnim }] }]}
            >
              <FontAwesome name="arrow-right" size={20} color="white" />
            </Animated.View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

function HomeTabs({ user }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Location') iconName = 'map-marker';
          else if (route.name === 'Parkings') iconName = 'car';
          else if (route.name === 'Notifications') iconName = 'bell';
          else if (route.name === 'Profile') iconName = 'user';

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6FADF5',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Parkings" component={Parkings} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={Screen19} options={{ headerShown: false }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ user }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const HomeMap = ({ route }) => {
  const { user } = route.params;
  return (
    <View style={styles.container}>
      <HomeTabs user={user} />
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
  customMarker: {
    backgroundColor: '#6FADF5',
    padding: 10,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bottomSheetText: {
    fontSize: 14,
    color: '#555',
  },
  spotCountText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#6FADF5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  slideContainer: {
    marginTop: 20,
    width: '100%',
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  slideButtonTextStatic: {
    position: 'absolute',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 1,
  },
  slidingCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6FADF5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
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
