
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Onboarding2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Text style={styles.title}>
        Always There : More Than 
        100 Parking Lots In Israel
        </Text>
      </View>
      <View style={styles.middleSection}>
        
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.stepsIndicator}>
          <View style={styles.dot} />
          <View style={styles.rectangle} />
          <View style={styles.dot} />
         
        </View>
        <Button
          mode="contained"
          style={styles.nextButton}
          onPress={() => navigation.navigate('OnboardingWelcome')}
        >
          <Icon name="arrow-forward" size={20} color="#fff" />
        </Button>
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
  middleSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  stepsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default Onboarding2;
