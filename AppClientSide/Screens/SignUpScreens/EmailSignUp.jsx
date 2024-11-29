import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';

const EmailSignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');

    const validateEmail = (input) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
        if (!emailRegex.test(input)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const validateConfirmEmail = (input) => {
        if (input !== email) {
            setConfirmEmailError("Email addresses don't match.");
        } else {
            setConfirmEmailError('');
        }
    };

    const handleNextPress = () => {
        if (!emailError && !confirmEmailError && email && confirmEmail) {
            navigation.navigate('NamesSignUp', { email, confirmEmail });
        } else {
            
            if (!email) setEmailError('Email is required.');
            if (!confirmEmail) setConfirmEmailError('Please confirm your email.');
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
                    <Text style={styles.title}>Add Your Email</Text>
                </View>
                <View style={styles.stepsContainer}>
                    <View style={[styles.step, styles.activeStep]} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                </View>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        validateEmail(text);
                    }}
                    mode="outlined"
                    placeholder="example@example.com"
                    style={styles.input}
                    outlineColor="#6FADF5"
                    activeOutlineColor="#6FADF5"
                    error={!!emailError}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <TextInput
                    label="Confirm Email"
                    value={confirmEmail}
                    onChangeText={(text) => {
                        setConfirmEmail(text);
                        validateConfirmEmail(text);
                    }}
                    mode="outlined"
                    placeholder="example@example.com"
                    style={styles.input}
                    outlineColor="#6FADF5"
                    activeOutlineColor="#6FADF5"
                    error={!!confirmEmailError}
                />
                {confirmEmailError ? <Text style={styles.errorText}>{confirmEmailError}</Text> : null}

                <Button
                    mode="contained"
                    style={styles.nextButton}
                    onPress={handleNextPress}
                    disabled={!!emailError || !!confirmEmailError || !email || !confirmEmail}
                >
                    Next
                </Button>
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
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 50,
        marginLeft: 50,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
        marginLeft: 39,
    },
    step: {
        width: 40,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d3d3d3',
    },
    activeStep: {
        backgroundColor: '#6FADF5',
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 15,
        fontSize: 12,
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: '#6FADF5',
        borderRadius: 5,
    },
});

export default EmailSignUp;
