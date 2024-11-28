import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const Parkings = ({ route }) => {
  const { user } = route.params || {};
  const [parkingRecords, setParkingRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); 
  const [spotToLotMap, setSpotToLotMap] = useState({});


  useEffect(() => {
    fetchSpots(); 
    if (user?._id) {
      fetchParkingRecords(user._id); 
    }
  }, [user]);
  


  const fetchSpots = async () => {
    try {
      const response = await fetch(
        `https://spotcker.onrender.com/api/ParkingSpots/getAllSpots`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch parking spots');
      }
  
      const data = await response.json();
  
      
      const mapping = {};
      data.spots.forEach((spot) => {
        mapping[spot._id] = spot.Lot_Name; 
      });
  
      setSpotToLotMap(mapping); 
    } catch (error) {
      console.error('Error fetching spots:', error);
    }
  };
  
  const fetchParkingRecords = async (userId) => {
    try {
      const response = await fetch(
        `https://spotcker.onrender.com/api/Parkings/getParkingsByUserId/${userId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch parking records');
      }

      const data = await response.json();
      setParkingRecords(data.parkings || []);
    } catch (error) {
      console.error('Error fetching parking records:', error);
    } finally {
      setLoading(false);
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

  const renderParkingRecord = ({ item }) => (
    <View style={styles.recordContainer}>
      <Text style={styles.recordTitle}>Parking Record</Text>
      <Text style={styles.recordText}>
        Location: {spotToLotMap[item.Spot_ID] || 'Unknown'}
      </Text>
      <Text style={styles.recordText}>Start: {item.Start_Date || 'Unknown'}</Text>
      <Text style={styles.recordText}>
        End: {item.End_Date ? item.End_Date : 'Ongoing'}
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
  );
  
  return (
    <View style={styles.container}>
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
    </View>
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
  listContainer: {
    paddingBottom: 20,
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
  noRecordsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    fontSize: 16,
    color: '#999',
  },
});

export default Parkings;
