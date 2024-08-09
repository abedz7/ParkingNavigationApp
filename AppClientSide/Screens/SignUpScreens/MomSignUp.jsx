import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';

const MomSignUp = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    style={styles.backButton}
                    size={24}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>
                    Do You Have a Child Under 
                    5 Years Old ?
                </Text>
            </View>
            <View style={styles.stepsContainer}>
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={[styles.step, styles.activeStep]} />
                <View style={styles.step} />
            </View>
            <View style={styles.buttonRow}>
                <Button
                    mode={selectedOption === 'Yes' ? 'contained' : 'outlined'}
                    style={[
                        styles.button,
                        selectedOption === 'Yes' && styles.selectedButton,
                        styles.buttonContainer,
                    ]}
                    onPress={() => setSelectedOption('Yes')}
                >
                    Yes
                </Button>
                <Button
                    mode={selectedOption === 'No' ? 'contained' : 'outlined'}
                    style={[
                        styles.button,
                        selectedOption === 'No' && styles.selectedButton,
                        styles.buttonContainer,
                    ]}
                    onPress={() => setSelectedOption('No')}
                >
                    No
                </Button>
            </View>
            <Button
                mode="contained"
                style={styles.nextButton}
                onPress={() => {
                    
                    navigation.navigate('PasswordSignUp', { selectedOption });
                }}
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 50,
        width: '80%',  // Reduce the width to allow wrapping
        alignSelf: 'center',  // Center the title horizontally
        lineHeight: 24,  // Adjust line height for better readability
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
        marginLeft: 50,
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
        marginTop: 40,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        borderColor: '#6FADF5',
        borderWidth: 2,
        backgroundColor: '#ffffff',
    },
    selectedButton: {
        backgroundColor: '#6FADF5',
        borderWidth: 0,
    },
    buttonContainer: {
        shadowColor: '#000',
        height: 45,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});

export default MomSignUp;
