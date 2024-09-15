import React, { useState } from 'react';
import { View, StyleSheet , TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';

const PhoneSignUp = ({ navigation, route }) => {
    const { email, confirmEmail, firstName, lastName } = route.params; 
    const [phoneNumber, setPhoneNumber] = useState('');
    const isNextButtonDisabled = !phoneNumber;

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
                placeholder="XXX-XXX-XXXX"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                 outlineColor="#000000"
                activeOutlineColor="#6FADF5"
            />
            <Button
                mode="contained"
                style={styles.nextButton}
                onPress={() => navigation.navigate('CarSignUp', { email, confirmEmail, firstName, lastName, phoneNumber })} 
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        marginBottom: 20,
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: '#6FADF5',
        borderRadius: 5,
    },
});

export default PhoneSignUp;
