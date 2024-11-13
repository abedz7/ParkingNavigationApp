import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, Button, IconButton, Menu } from 'react-native-paper';

const CarSignUp = ({ navigation, route }) => {
    const { email, confirmEmail, firstName, lastName, phoneNumber } = route.params; 
    const [carPlate, setCarPlate] = useState('');
    const [carData, setCarData] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [menuVisible, setMenuVisible] = useState(false); 
    const [modelMenuVisible, setModelMenuVisible] = useState(false);
    const [carPlateError, setCarPlateError] = useState('');

    useEffect(() => {
        const data = require('../../assets/data/carData.json');
        setCarData(data);
    }, []);

    const validateCarPlate = (input) => {
        const oldFormat = /^\d{2}-\d{3}-\d{2}$/; // XX-XXX-XX
        const newFormat = /^\d{3}-\d{2}-\d{3}$/; // XXX-XX-XXX
        if (!oldFormat.test(input) && !newFormat.test(input)) {
            setCarPlateError('Please enter a valid car plate (e.g., 12-345-67 or 123-45-678).');
        } else {
            setCarPlateError('');
        }
    };

    const handleNext = () => {
        if (!carPlateError && carPlate) {
            const newCar = {
                brand: selectedBrand,
                model: selectedModel,
                plate: carPlate,
            };
            navigation.navigate('DisabledSignUp', { email, confirmEmail, firstName, lastName, phoneNumber, cars: [newCar] });
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
                    <Text style={styles.title}>Add Your Car Details</Text>
                </View>
                <View style={styles.stepsContainer}>
                    <View style={[styles.step, styles.activeStep]} />
                    <View style={[styles.step, styles.activeStep]} />
                    <View style={[styles.step, styles.activeStep]} />
                    <View style={[styles.step, styles.activeStep]} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                    <View style={styles.step} />
                </View>
                <Text style={styles.label}>Car Brand</Text>
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Button
                            mode="outlined"
                            style={styles.menuButton}
                            onPress={() => setMenuVisible(true)}
                        >
                            {selectedBrand ? selectedBrand : 'Select Car Brand'}
                        </Button>
                    }
                >
                    {carData.map((car) => (
                        <Menu.Item
                            key={car.brand}
                            onPress={() => {
                                setSelectedBrand(car.brand);
                                setMenuVisible(false);
                            }}
                            title={car.brand}
                        />
                    ))}
                </Menu>

                {selectedBrand && (
                    <>
                        <Text style={styles.label}>Car Model</Text>
                        <Menu
                            visible={modelMenuVisible}
                            onDismiss={() => setModelMenuVisible(false)}
                            anchor={
                                <Button
                                    mode="outlined"
                                    style={styles.menuButton}
                                    onPress={() => setModelMenuVisible(true)}
                                >
                                    {selectedModel ? selectedModel : 'Select Car Model'}
                                </Button>
                            }
                        >
                            {carData.find((car) => car.brand === selectedBrand)?.models.map((model) => (
                                <Menu.Item
                                    key={model}
                                    onPress={() => {
                                        setSelectedModel(model);
                                        setModelMenuVisible(false);
                                    }}
                                    title={model}
                                />
                            ))}
                        </Menu>
                    </>
                )}

                <TextInput
                    label="Car Plate"
                    mode="outlined"
                    placeholder="XX-XXX-XX / XXX-XX-XXX"
                    value={carPlate}
                    onChangeText={(text) => {
                        setCarPlate(text);
                        validateCarPlate(text);
                    }}
                    style={styles.input}
                    outlineColor="#6FADF5"
                    activeOutlineColor="#6FADF5"
                    error={!!carPlateError}
                />
                {carPlateError ? <Text style={styles.errorText}>{carPlateError}</Text> : null}

                <Button
                    mode="contained"
                    style={styles.nextButton}
                    onPress={handleNext}
                    disabled={!selectedBrand || !selectedModel || !carPlate || !!carPlateError} 
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
        color: '#6FADF5',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 15,
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: '#6FADF5',
        borderRadius: 5,
        paddingVertical: 10,
    },
    menuButton: {
        borderColor: '#6FADF5',
        borderWidth: 1,
        marginBottom: 20,
    },
});

export default CarSignUp;
