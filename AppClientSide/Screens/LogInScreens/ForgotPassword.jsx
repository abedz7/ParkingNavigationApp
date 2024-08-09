import React, { useState } from "react";
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, TextInput, IconButton } from 'react-native-paper';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await fetch('https://spotcker.onrender.com/api/Users/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email_adress: email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Temporary password sent to your email.');
                navigation.navigate('Screen14'); // Navigate to next screen if necessary
            } else {
                Alert.alert('Error', data.error || 'Failed to send temporary password.');
            }
        } catch (error) {
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
                <Text style={styles.title}>Reset Password</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="example@example.com"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputmail}
                />
            </View>
            <Button
                mode="contained"
                style={styles.continueButton}
                onPress={handleForgotPassword}
            >
                Send
            </Button>
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
        marginTop: 30,
    },
    inputmail: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ccc',
    },
    continueButton: {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#6FADF5'
    },
});

export default ForgotPassword;
