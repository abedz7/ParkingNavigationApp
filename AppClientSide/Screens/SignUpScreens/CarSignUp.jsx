import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const CarSignUp = ({ navigation }) => {
    const [carPlate, setCarPlate] = useState('');
    const [carData, setCarData] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        // Directly require the JSON file
        const data = require('../../assets/data/carData.json');
        setCarData(data);
    }, []);

    const handleBrandChange = (brand) => {
        setSelectedBrand(brand);
        const selectedCarBrand = carData.find(car => car.brand === brand);
        setModels(selectedCarBrand ? selectedCarBrand.models : []);
        setSelectedModel(''); // Reset model selection when brand changes
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
            <Picker
                selectedValue={selectedBrand}
                onValueChange={handleBrandChange}
                style={styles.input}
            >
                <Picker.Item label="Select Car Brand" value="" />
                {carData.map((car) => (
                    <Picker.Item key={car.brand} label={car.brand} value={car.brand} />
                ))}
            </Picker>
            <Text style={styles.label}>Car Model</Text>
            <Picker
                selectedValue={selectedModel}
                onValueChange={(model) => setSelectedModel(model)}
                style={styles.input}
                enabled={models.length > 0}
            >
                <Picker.Item label="Select Car Model" value="" />
                {models.map((model) => (
                    <Picker.Item key={model} label={model} value={model} />
                ))}
            </Picker>
            <Text style={styles.label}>License Plate Number</Text>
            <TextInput
                mode="outlined"
                placeholder="XX-XXX-XX / XXX-XX-XXX"
                value={carPlate}
                onChangeText={setCarPlate}
                style={styles.input}
            />           
            <Button
                mode="contained"
                style={styles.nextButton}
                onPress={() => navigation.navigate('DisabledSignUp')} 
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
});

export default CarSignUp;
