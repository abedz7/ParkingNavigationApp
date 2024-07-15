import React from "react";
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
const Screen12 = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [Password, setPassword] = useState('');

    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    style={styles.backButton}
                    size={24}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Log Into Account</Text>
            </View>
            <Text style={styles.label}>Email</Text>
            <TextInput
                placeholder="example@example.com"
                value={email}
                onChangeText={setEmail}
                style={styles.inputmail}
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    value={Password}
                    onChangeText={setPassword}
                    style={styles.inputpass}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <Button
                mode="contained"
                style={styles.continueButton}
                onPress={() => navigation.navigate('Screen15')}               
            >
                Log In
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('Screen13')}>
          <Text style={styles.loginText}>
            forgot password? <Text style={styles.loginLink}></Text>
          </Text>
        </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    inputmail: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ccc',
    },
    inputpass: {
        width: '90%',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#ccc',

    },
    icon: {
        padding: 10,

    },
    continueButton :{
        marginTop: 40,
        borderRadius: 5,
        backgroundColor :'#6FADF5'
    },
    loginText : {
fontWeight: 'bold',
marginTop: 35,
textAlign: 'center',

    }

});
export default Screen12;