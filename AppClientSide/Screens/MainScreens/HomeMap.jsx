import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import Parkings from '../MainScreens/Parkings';
import Screen19 from '../MainScreens/Screen19';
import Profile from '../MainScreens/Profile';

const Tab = createBottomTabNavigator();

const LocationScreen = ({ navigation, route }) => {
  const mapRef = useRef(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);
  const [spotCounts, setSpotCounts] = useState({ Regular: 0, Mother: 0, DisabledPerson: 0 });
  const [isReserved, setIsReserved] = useState(false);
  const [reservedSpot, setReservedSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [parkingRecordId, setParkingRecordId] = useState(null);
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [reservations, setReservations] = useState({});
  const [cardLoading, setCardLoading] = useState(false);


  const { user } = route.params || {};
  if (!user) {
    return <Text>Error: User data is missing</Text>;
  }

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
    setCardLoading(true); // Start loading
    setSelectedParkingLot(parkingLot);
  
    // Reset reservation state initially
    const reservation = reservations[parkingLot._id];
    if (reservation) {
      setIsReserved(true);
      setReservedSpot(reservation.reservedSpot);
      setParkingRecordId(reservation.parkingRecordId);
    } else {
      setIsReserved(false);
      setReservedSpot(null);
      setParkingRecordId(null);
    }
  
    try {
      const response = await fetch(
        `https://spotcker.onrender.com/api/ParkingSpots/getParkingSpotsByLotName/${parkingLot.Name}`
      );
      const data = await response.json();
  
      if (data.spots) {
        const counts = data.spots.reduce(
          (acc, spot) => {
            acc.total = (acc.total || 0) + 1;
            if (spot.Is_Available) {
              acc[spot.Spot_Type] = (acc[spot.Spot_Type] || 0) + 1;
              acc.available = (acc.available || 0) + 1;
            }
            return acc;
          },
          { total: 0, available: 0, Regular: 0, Mother: 0, DisabledPerson: 0 }
        );
        setSpotCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching parking spots:', error);
    } finally {
      setCardLoading(false); // Stop loading
    }
  };
  

  const handleReservation = async () => {
    if (!selectedParkingLot) {
      console.error('No parking lot selected for reservation');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(
        'https://spotcker.onrender.com/api/Parkings/addParking',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Spot_ID: selectedParkingLot._id,
            User_ID: user._id,
            Start_Date: new Date().toISOString(),
            Start_Time: new Date().toLocaleTimeString(),
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to create parking record');
      }
  
      const data = await response.json();
      const parkingId = data.addedParking?.insertedId;
      if (!parkingId) {
        throw new Error('Failed to retrieve parking record ID from the response');
      }
  
      console.log('Parking Record Created:', parkingId);
  
      // Store reservation data for the selected lot
      setReservations((prevReservations) => ({
        ...prevReservations,
        [selectedParkingLot._id]: {
          parkingRecordId: parkingId,
          reservedSpot: selectedParkingLot,
        },
      }));
  
      setParkingRecordId(parkingId);
      setReservedSpot(selectedParkingLot);
      setIsReserved(true);
      setModalMessage('Reservation successful!');
      setModalVisible(true);
    } catch (error) {
      console.error('Error creating parking record:', error);
      setModalMessage('Error creating parking record');
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const endReservation = async () => {
    if (!parkingRecordId) {
      console.error('No parking record ID found');
      setModalMessage('Error: No parking record found to end reservation.');
      setModalVisible(true);
      return;
    }
  
    setLoadingEnd(true);
  
    try {
      const response = await fetch(
        `https://spotcker.onrender.com/api/Parkings/updateParking/${parkingRecordId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            End_Date: new Date().toISOString(),
            End_Time: new Date().toLocaleTimeString(),
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to update parking record');
      }
  
      // Clear reservation for this lot
      setReservations((prevReservations) => {
        const updatedReservations = { ...prevReservations };
        delete updatedReservations[selectedParkingLot._id];
        return updatedReservations;
      });
  
      setModalMessage('Reservation ended successfully!');
      setModalVisible(true);
      setIsReserved(false);
      setReservedSpot(null);
      setParkingRecordId(null);
    } catch (error) {
      console.error('Error ending reservation:', error);
      setModalMessage('Error ending reservation');
      setModalVisible(true);
    } finally {
      setLoadingEnd(false);
    }
  };
  

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView ref={mapRef} style={styles.map} initialRegion={initialRegion}>
          {deviceLocation && <Marker coordinate={deviceLocation} title="You Are Here" />}
          {Array.isArray(parkingLots) &&
            parkingLots.map((parkingLot, index) => (
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
          {errorMsg ? (
            <Text>{errorMsg}</Text>
          ) : (
            <ActivityIndicator size="large" color="#6FADF5" />
          )}
        </View>
      )}
      
  
      {selectedParkingLot && (
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            onPress={() => setSelectedParkingLot(null)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.bottomSheetTitle}>{selectedParkingLot.Name}</Text>
          <Text style={styles.spotCountText}>
            Regular Spots: {spotCounts.Regular}
          </Text>
          <Text style={styles.spotCountText}>
            Mother Spots: {spotCounts.Mother}
          </Text>
          <Text style={styles.spotCountText}>
            Disabled Person Spots: {spotCounts.DisabledPerson}
          </Text>
  
          {isReserved ? (
            <TouchableOpacity
              style={styles.endButton}
              onPress={endReservation}
              disabled={loadingEnd}
            >
              {loadingEnd ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.endButtonText}>End Park</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.reserveButton,
                (spotCounts.available === 0 || cardLoading) && { opacity: 0.5 },
              ]}
              onPress={handleReservation}
              disabled={spotCounts.available === 0 || cardLoading}
            >
              {isLoading || cardLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.reserveButtonText}>Reserve Spot</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
  
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      <Tab.Screen
        name="Location"
        component={LocationScreen}
        initialParams={{ user }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Parkings"
        component={Parkings}
        initialParams={{ user }}
        options={{ headerShown: false }}
      />
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
  const { user } = route.params || {};
  if (!user) {
    return <Text>Error: User data is missing</Text>;
  }

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
  reserveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  endButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  endButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#6FADF5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  cardLoadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6FADF5',
  },
  
});

export default HomeMap;
