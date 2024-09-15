import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, TextInput, IconButton, ActivityIndicator } from 'react-native-paper';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);  

    const handleForgotPassword = async () => {
        setLoading(true);  
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

            setLoading(false);  

            if (response.ok) {
                navigation.navigate('ForgotConfirm');
            } else {
                console.error(data.error || 'Failed to send temporary password.');
            }
        } catch (error) {
            setLoading(false);  
            console.error('Error:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

                <Text style={styles.instructionText}>
                    Enter your email to get a new temporary password.
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Email"
                        placeholder="example@example.com"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={styles.input}
                        outlineColor="#6FADF5"
                        activeOutlineColor="#6FADF5"
                    />
                </View>

                <Button
                    mode="contained"
                    style={styles.continueButton}
                    onPress={handleForgotPassword}
                    disabled={!email || loading}  
                >
                    {loading ? 'Sending...' : 'Send'}
                </Button>

                {loading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator animating={true} color="#6FADF5" />
                        
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
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
    instructionText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    continueButton: {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#6FADF5',
    },
    loaderContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ForgotPassword;
