import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const PasswordSignUp = ({ navigation, route }) => {
    const { email, confirmEmail, firstName, lastName, phoneNumber, cars, haveDisabledCertificate, isMom } = route.params; 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return { minLength, hasNumber, hasSymbol };
    };

    const { minLength, hasNumber, hasSymbol } = validatePassword(password);
    const passwordsMatch = password === confirmPassword;

    const handleNext = () => {
        navigation.navigate('SummaryScreen', {
            email,
            confirmEmail,
            firstName,
            lastName,
            phoneNumber,
            cars,
            haveDisabledCertificate,
            isMom,
            password,
            confirmPassword,
        });
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
                <Text style={styles.title}>Add Your Password</Text>
            </View>
            <View style={styles.stepsContainer}>
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
            </View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={!showConfirmPassword}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <Feather name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>
            {confirmPassword && !passwordsMatch && (
                <Text style={styles.invalid}>Passwords do not match</Text>
            )}
            <View style={styles.validationContainer}>
                <Text style={minLength ? styles.valid : styles.invalid}>
                    ✓ 8 characters minimum
                </Text>
                <Text style={hasNumber ? styles.valid : styles.invalid}>
                    ✓ a number
                </Text>
                <Text style={hasSymbol ? styles.valid : styles.invalid}>
                    ✓ one symbol minimum
                </Text>
            </View>
            <Button
                mode="contained"
                style={styles.continueButton}
                onPress={handleNext}
                disabled={!minLength || !hasNumber || !hasSymbol || !passwordsMatch}
            >
                Continue
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
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    step: {
        width: 40,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d3d3d3',
        marginHorizontal: 5,
    },
    activeStep: {
        backgroundColor: '#6FADF5',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    icon: {
        padding: 10,
    },
    validationContainer: {
        marginBottom: 20,
    },
    valid: {
        color: 'green',
    },
    invalid: {
        color: 'red',
    },
    continueButton: {
        backgroundColor: '#6FADF5',
        borderRadius: 5,
        padding: 10,
    },
});

export default PasswordSignUp;
