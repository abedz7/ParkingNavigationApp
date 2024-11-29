import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = ({ route, navigation }) => {
  const { user } = route.params || {};
  const [parkingRecords, setParkingRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (user?._id) {
      fetchParkingRecords(user._id);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      if (user?._id) {
        fetchParkingRecords(user._id);
      }
    });

    return unsubscribe;
  }, [user, navigation]);

  const fetchParkingRecords = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://spotcker.onrender.com/api/Parkings/getParkingsByUserId/${userId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch parking records');
      }

      const data = await response.json();
      const validRecords = data.parkings.filter((record) => record.Spot_ID);

      const recordsWithLotNames = await Promise.all(
        validRecords.map(async (record) => {
          const lotName = await fetchLotNameBySpotId(record.Spot_ID);
          return { ...record, Lot_Name: lotName };
        })
      );

      setParkingRecords(recordsWithLotNames);
    } catch (error) {
      console.error('Error fetching parking records:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLotNameBySpotId = async (spotId) => {
    if (!spotId) {
      console.error("Invalid Spot ID:", spotId);
      return "Unknown";
    }

    try {
      const response = await fetch(
        `https://spotcker.onrender.com/api/ParkingSpots/getLotNameBySpotId/${spotId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      return data.lotName || "Unknown";
    } catch (error) {
      console.error(`Error fetching lot name for Spot_ID ${spotId}:`, error);
      return "Unknown";
    }
  };

  const handleEndParking = async (recordId) => {
    setUpdatingId(recordId);
    try {
      const response = await fetch(
        `https://spotcker.onrender.com/api/Parkings/updateParking/${recordId}`,
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
        throw new Error('Failed to end parking session');
      }

      setParkingRecords((prevRecords) =>
        prevRecords.map((record) =>
          record._id === recordId
            ? {
                ...record,
                End_Date: new Date().toISOString(),
                End_Time: new Date().toLocaleTimeString(),
              }
            : record
        )
      );
    } catch (error) {
      console.error('Error ending parking session:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteParkingRecord = async (recordId) => {
    try {
      const response = await fetch(
        `https://spotcker.onrender.com/api/Parkings/removeParking/${recordId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete parking record');
      }

      setParkingRecords((prevRecords) =>
        prevRecords.filter((record) => record._id !== recordId)
      );
    } catch (error) {
      console.error('Error deleting parking record:', error);
      Alert.alert('Error', 'Failed to delete parking record.');
    }
  };

  const renderRightActions = (recordId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() =>
        Alert.alert(
          'Delete Parking Record',
          'Are you sure you want to delete this parking record?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => handleDeleteParkingRecord(recordId) },
          ]
        )
      }
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderParkingRecord = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item._id)}>
      <View style={styles.recordContainer}>
        <Text style={styles.recordTitle}>{item.Lot_Name || 'Unknown Lot'}</Text>
        <Text style={styles.recordText}>
          <Text style={styles.boldText}>Start:</Text> {item.Start_Date || 'Unknown'}
        </Text>
        <Text style={styles.recordText}>
          <Text style={styles.boldText}>End:</Text>{' '}
          {item.End_Date ? item.End_Date : 'Ongoing'}
        </Text>

        {!item.End_Date && (
          <TouchableOpacity
            style={styles.endButton}
            onPress={() => handleEndParking(item._id)}
            disabled={updatingId === item._id}
          >
            {updatingId === item._id ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.endButtonText}>End Parking</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </Swipeable>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6FADF5" />
        <Text style={styles.loaderText}>Loading your parking records...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {parkingRecords.length > 0 ? (
        <FlatList
          data={parkingRecords}
          keyExtractor={(item) => item._id}
          renderItem={renderParkingRecord}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>No parking records found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6FADF5',
  },
  recordContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recordText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  endButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  endButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
