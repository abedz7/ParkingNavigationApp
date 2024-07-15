import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';

const Screen6 = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    style={styles.backButton}
                    size={24}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Add Your First & Last Name</Text>
            </View>
            <View style={styles.stepsContainer}>
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={styles.step} />
                <View style={styles.step} />
                <View style={styles.step} />
                <View style={styles.step} />
            </View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
                mode="outlined"               
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
                mode="outlined"             
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
            />
            <Button
                mode="contained"
                style={styles.nextButton}
                onPress={() => navigation.navigate('Screen7')} 
            >
                Next
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
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 50,
        marginLeft: 5,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
        marginLeft: 45,
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

export default Screen6;
