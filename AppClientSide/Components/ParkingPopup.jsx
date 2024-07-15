import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Image } from 'react-native';

const ParkingPopup = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Image
              source={require('../assets/images/ParkingIcon.png')}
              style={styles.image}
            />
            <IconButton
              icon="close"
              size={20}
              onPress={onClose}
              style={styles.closeButton}
              iconColor="white"
            />
          </View>
          <Text style={styles.title}>Ruppin Academic Centre</Text>
          <View style={styles.separator} />
          <Text style={styles.text}>Available Spots: 0</Text>
          <Text style={styles.text}>Available Disabled Spots: 0</Text>
          <Text style={styles.text}>Available Mother Spots: 0</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Park Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    height: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 90,
    backgroundColor: '#6FADF5',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default ParkingPopup;
