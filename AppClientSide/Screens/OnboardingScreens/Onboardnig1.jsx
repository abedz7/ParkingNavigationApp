import React from 'react';
import { View, StyleSheet, TouchableOpacity , Image } from 'react-native';
import { Text } from 'react-native-paper';


const Onboarding1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Text style={styles.title}>
          Park Easily: Find An Empty Parking Spot In Seconds
        </Text>
      </View>
      <View style={styles.middleSection}>
        <Image
          source={require('../../assets/images/Onboarding1Pic.png')}
          style={styles.image}
       />
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.stepsIndicator}>
          <View style={styles.rectangle} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Onboarding2')}
        >
          <Text style={styles.buttonText}>
            Next 
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6FADF5',
  },
  upperSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  middleSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stepsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
  },
  rectangle: {
    width: 20,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
  },
  nextButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 25,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Onboarding1;
