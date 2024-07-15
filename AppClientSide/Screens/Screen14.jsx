import React from "react";
import { useState } from 'react';
import { View, StyleSheet , Image } from 'react-native';
import { Text, Button,  IconButton } from 'react-native-paper';
const Screen14 = ({ navigation }) => {
   
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    style={styles.backButton}
                    size={24}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Reset Password</Text>
            </View>
            <Image
                source={require('../assets/images/Password.png')} 
                style={styles.icon}
            />
            <Text style={styles.message}>
                We have sent an email to <Text style={styles.email}>Example@Email.com</Text>
                with a temporary password. You can set a new one in the settings.
            </Text>
            <Button
                mode="contained"
                style={styles.continueButton}
                onPress={() => navigation.navigate('Screen12')}
            >
                Back to login
            </Button>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    inputContainer: {
      marginTop: 30,
    },
    inputmail: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ccc',
    },
    continueButton: {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#6FADF5'
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 30,
        marginLeft: 155,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    email: {
        fontWeight: 'bold',
    },
   
    

});
export default Screen14;