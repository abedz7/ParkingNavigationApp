import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';

const CreateSuccess = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/Success2.png')} 
                style={styles.icon}
            />
            <Text style={styles.title}>Your account was successfully created!</Text>
            <Text style={styles.subtitle}>Only one click to Park Easily.</Text>
            <Button
                mode="contained"
                style={styles.loginButton}
                onPress={() => navigation.navigate('LogIn')}
            >
                Log in
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: '#6FADF5',
        width: '80%',
        borderRadius: 5,
    },
});

export default CreateSuccess;
