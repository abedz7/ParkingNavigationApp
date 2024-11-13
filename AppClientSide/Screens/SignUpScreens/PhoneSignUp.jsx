import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';

const PhoneSignUp = ({ navigation, route }) => {
    const { email, confirmEmail, firstName, lastName } = route.params; 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const validatePhoneNumber = (input) => {
        const phoneRegex = /^05[01234578]-\d{3}-\d{4}$/; // Israeli phone number regex
        if (!phoneRegex.test(input)) {
            setPhoneError('Please enter a valid Israeli phone number (e.g., 050-123-4567).');
        } else {
            setPhoneError('');
        }
    };

    const handleNextPress = () => {
        if (!phoneError && phoneNumber) {
            navigation.navigate('CarSignUp', { email, confirmEmail, firstName, lastName, phoneNumber });
        } else if (!phoneNumber) {
            setPhoneError('Phone number is required.');
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
                    <Text style={styles.title}>Add Your Phone Number</Text>
                </View>
                <View style={styles.stepsContainer}>
                    <View style={[styles.step, styles.activeStep]} />
                    <View style={[styles.step, styles.activeStep]} />
                    <View style={[styles.step, styles.activeStep]} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                </View>

                <TextInput
                    label="Phone Number"
                    mode="outlined"
                    placeholder="050-123-4567"
                    value={phoneNumber}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                        validatePhoneNumber(text);
                    }}
                    style={styles.input}
                    outlineColor="#000000"
                    activeOutlineColor="#6FADF5"
                    error={!!phoneError}
                />
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

                <Button
                    mode="contained"
                    style={styles.nextButton}
                    onPress={handleNextPress}
                    disabled={!!phoneError || !phoneNumber}
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
        marginLeft: 10,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
        marginLeft: 40,
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

export default PhoneSignUp;
