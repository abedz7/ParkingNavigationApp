import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ParkingIcon = ({ coordinate, parkingLotName }) => {
  return (
    <Marker coordinate={coordinate}>
      <View style={styles.customMarker}>
        <Image
          source={require('../assets/images/ParkingIcon.png')}
          style={styles.image}
        />
        <Text style={styles.parkingLotName}>{parkingLotName}</Text>
      </View>
      <Callout>
        <View style={styles.calloutView}>
        
          <Text style={styles.calloutText}>{parkingLotName}</Text>
          
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  customMarker: {
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  parkingLotName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calloutView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calloutImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  calloutText: {
    fontSize: 16,
  },
});

export default ParkingIcon;
