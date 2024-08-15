import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native'; 
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CarSignUp = ({ navigation }) => {
    const [carPlate, setCarPlate] = useState('');
    const [carData, setCarData] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

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

    const requestPhotoPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'SpotCker Photo Access Permission',
                    message:
                        'SpotCker needs access to your photo library ' +
                        'so you can upload an image of your car.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const handleImageUpload = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            alert('Permission to access media library is required!');
            return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!pickerResult.cancelled) {
            setSelectedImage(pickerResult.uri);
            extractLicensePlate(pickerResult);
        }
    };

    const extractLicensePlate = async (image) => {
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            name: 'car_image.jpg',
            type: 'image/jpeg'
        });

        try {
            const response = await axios.post('https://license-extractor.onrender.com/upload-image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data['Detected License Plate Text']) {
                setCarPlate(response.data['Detected License Plate Text']);
            } else {
                console.log('License plate not detected');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
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
            <View style={styles.plateInputContainer}>
                <TextInput
                    mode="outlined"
                    placeholder="XX-XXX-XX / XXX-XX-XXX"
                    value={carPlate}
                    onChangeText={setCarPlate}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleImageUpload}>
                    <Image
                        source={require('../../assets/images/abed.jpg')} 
                        style={styles.photoIcon}
                    />
                </TouchableOpacity>
            </View>
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
    plateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginBottom: 20,
    },
    photoIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: '#6FADF5',
        borderRadius: 5,
    },
});

export default CarSignUp;
