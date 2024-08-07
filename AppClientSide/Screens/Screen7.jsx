import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';

const Screen7 = ({ navigation }) => {
    const [userName, setUserName] = useState('');
  

    return (
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
            </View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                mode="outlined"
                placeholder="XXX-XXX-XXXX"
                value={userName}
                onChangeText={setUserName}
                style={styles.input}
            />
            
            <Button
                mode="contained"
                style={styles.nextButton}
                onPress={() => navigation.navigate('Screen8')} 
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

export default Screen7;
