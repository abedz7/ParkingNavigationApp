import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const ChangePass = ({ navigation, route }) => {
    const { userId } = route.params; 
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleConfirm = async () => {
        if (newPassword !== confirmNewPassword) {
            Alert.alert("Error", "New passwords do not match");
            return;
        }
    
        try {
            const response = await fetch(`https://spotcker.onrender.com/api/Users/changePassword/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword, 
                    Password: newPassword, 
                }),
            });
    
            if (response.ok) {
                Alert.alert("Success", "Password changed successfully");
                navigation.goBack(); 
            } else {
                const data = await response.json();
                Alert.alert("Error", data.error || "Failed to change password");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again later.");
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
                <Text style={styles.title}>Change Password</Text>
            </View>

            <Text style={styles.label}>Current Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={!showCurrentPassword}
                    placeholder="Current Password"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                    <Feather name={showCurrentPassword ? "eye-off" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={!showNewPassword}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                >
                    <Feather name={showNewPassword ? "eye-off" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={!showConfirmNewPassword}
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                >
                    <Feather name={showConfirmNewPassword ? "eye-off" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <Button
                mode="contained"
                style={styles.confirmButton}
                onPress={handleConfirm}
                disabled={!currentPassword || !newPassword || newPassword !== confirmNewPassword}
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginTop: 50,
        marginRight: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
    },
    icon: {
        padding: 10,
    },
    confirmButton: {
        backgroundColor: '#6FADF5',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    },
});

export default ChangePass;
