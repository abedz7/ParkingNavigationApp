import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';

const OnboardingWelcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/Prking.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome To SpotCker</Text>
        <Text style={styles.subtitle}>
          Join Over 10,000 Users Around The World{'\n'}And Park Easily
        </Text>
        <Button
          mode="contained"
          style={styles.createAccountButton}
          labelStyle={styles.createAccountButtonText}
          onPress={() => navigation.navigate('EmailSignUp')}
        >
          Create Account
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.loginText}>
            Already Have An Account? <Text style={styles.loginLink}>Log In</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 2,

  },
  image: {
    width: '130%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
    
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  createAccountButton: {
    width: '80%',
    backgroundColor: '#fff',
    marginVertical: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#000000',
    fontSize: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  loginLink: {
    color: '#000000',
    textDecorationLine: 'underline',
  },
});

export default OnboardingWelcome;
