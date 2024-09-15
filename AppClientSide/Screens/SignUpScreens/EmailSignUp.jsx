import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';

const EmailSignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const isNextButtonDisabled = !email || !confirmEmail;

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
                    onChangeText={setEmail}
                    mode="outlined"
                    placeholder="example@example.com"
                    style={styles.input}
                    outlineColor="#6FADF5"
                    activeOutlineColor="#6FADF5"
                />
                <TextInput
                    label="Confirm Email"
                    value={confirmEmail}
                    onChangeText={setConfirmEmail}
                    mode="outlined"
                    placeholder="example@example.com"
                    style={styles.input}
                    outlineColor="#6FADF5"
                    activeOutlineColor="#6FADF5"
                />
                <Button
                    mode="contained"
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('NamesSignUp', { email, confirmEmail })}
                    disabled={isNextButtonDisabled}
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
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: '#6FADF5',
        borderRadius: 5,
    },
});

export default EmailSignUp;
