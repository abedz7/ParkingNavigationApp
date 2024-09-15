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
      setLoading(false);

      if (response.ok) {
        // Navigate to HomeMap and pass the logged-in user data
        navigation.navigate('HomeMap', { user: data.User });
      } else {
        Alert.alert('Error', data.error || 'Failed to authenticate');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
  input: {
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#6FADF5',
  },
});

export default LogIn;
