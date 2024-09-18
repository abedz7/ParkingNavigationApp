import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert } from 'react-native';
import { Text, Button, TextInput, IconButton } from 'react-native-paper';

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://spotcker.onrender.com/api/Users/authenticateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email_adress: email,
          Password: password,
        }),
      });
  
      const data = await response.json();
      console.log('User data after login:', data); 
      setLoading(false);
  
      if (response.ok) {
        navigation.navigate('HomeMap', { user: data });
      } else {
        Alert.alert('Failed to authenticate');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text style={styles.title}>Log Into Account</Text>
        </View>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          outlineColor="#6FADF5"
          activeOutlineColor="#6FADF5"
        />

        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          outlineColor="#6FADF5"
          activeOutlineColor="#6FADF5"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#6FADF5" />
        ) : (
          <Button
            mode="contained"
            onPress={handleLogin}
            disabled={!email || !password}
            style={styles.loginButton}
          >
            Log In
          </Button>
        )}

        <Button
          mode="text"
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPassword}
        >
          Forgot Password?
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 50, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    flex: 1,
  },
  input: {
    marginBottom: 20,
    marginTop: 10, 
  },
  loginButton: {
    backgroundColor: '#6FADF5',
    marginTop: 10,
  },
  forgotPassword: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default LogIn;
