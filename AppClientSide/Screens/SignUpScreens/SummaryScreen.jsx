import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const SummaryScreen = ({ route, navigation }) => {
    const {
        email,
        firstName,
        lastName,
        phoneNumber,
        cars,
        haveDisabledCertificate,
        isMom,
        password,  
    } = route.params;

    const handleConfirm = async () => {
        try {
            const response = await fetch('https://spotcker.onrender.com/api/Users/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email_adress: email,
                    First_Name: firstName,
                    Last_Name: lastName,
                    Phone_Number: phoneNumber,
                    Cars: cars,
                    HaveDisabledCretificate: haveDisabledCertificate,
                    IsMom: isMom,
                    Password: password, 
                }),
            });
    
            if (response.ok) {
                navigation.navigate('CreateSuccess');
            } else {
                console.error('Failed to create user:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Confirm Your Details</Text>

            <View style={styles.detailContainer}>
                <MaterialIcons name="person" size={30} color="#6FADF5" />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>First & Last Name</Text>
                    <Text style={styles.value}>{firstName} {lastName}</Text>
                </View>
            </View>

            <View style={styles.detailContainer}>
                <MaterialIcons name="email" size={30} color="#6FADF5" />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Email</Text>
                    <Text style={styles.value}>{email}</Text>
                </View>
            </View>

            <View style={styles.detailContainer}>
                <MaterialIcons name="phone" size={30} color="#6FADF5" />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Phone Number</Text>
                    <Text style={styles.value}>{phoneNumber}</Text>
                </View>
            </View>

            <View style={styles.detailContainer}>
                <MaterialIcons name="directions-car" size={30} color="#6FADF5" />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Car Details</Text>
                    {cars.map((car, index) => (
                        <Text key={index} style={styles.value}>
                            {car.brand} {car.model} - {car.plate}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.detailContainer}>
                <MaterialIcons name="accessible" size={30} color="#6FADF5" />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Disabled Certificate</Text>
                    <Text style={styles.value}>{haveDisabledCertificate ? 'Yes' : 'No'}</Text>
                </View>
            </View>

            <View style={styles.detailContainer}>
                <MaterialIcons name="child-care" size={30} color="#6FADF5" />
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Is Mom</Text>
                    <Text style={styles.value}>{isMom ? 'Yes' : 'No'}</Text>
                </View>
            </View>

            <Button
                mode="contained"
                style={styles.confirmButton}
                onPress={handleConfirm}
            >
                Confirm
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center', 
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    textWrapper: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#555',
    },
    confirmButton: {
        marginTop: 30,
        backgroundColor: '#6FADF5',
        borderRadius: 5,
        paddingVertical: 10,
    },
});

export default SummaryScreen;
