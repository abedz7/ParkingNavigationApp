import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, TextInput, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Screen12 = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
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

            if (response.ok) {
                // Handle successful authentication (e.g., store token, navigate to another screen)
                Alert.alert('Success', 'Authentication successful');
                navigation.navigate('Screen15');
            } else {
                // Handle errors (e.g., user not found, invalid credentials)
                Alert.alert('Error', data.error || 'Failed to authenticate');
            }
        } catch (error) {
            // Handle network or other errors
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    style={styles.backButton}
                    size={24}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Log Into Account</Text>
            </View>
            <Text style={styles.label}>Email</Text>
            <TextInput
                placeholder="example@example.com"
                value={email}
                onChangeText={setEmail}
                style={styles.inputmail}
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.inputpass}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <Button
                mode="contained"
                style={styles.continueButton}
                onPress={handleLogin}               
            >
                Log In
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('Screen13')}>
                <Text style={styles.loginText}>
                    Forgot password? <Text style={styles.loginLink}></Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginTop: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginRight: 30,
        marginTop: 50,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    inputmail: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ccc',
    },
    inputpass: {
        width: '90%',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#ccc',

    },
    icon: {
        padding: 10,

    },
    continueButton :{
        marginTop: 40,
        borderRadius: 5,
        backgroundColor :'#6FADF5'
    },
    loginText : {
fontWeight: 'bold',
marginTop: 35,
textAlign: 'center',

    }

});
export default Screen12;
