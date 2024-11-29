import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal, Button, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const UsersPanel = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoading(true); 
      const response = await fetch('https://spotcker.onrender.com/api/Users/getAllUsers');
      const data = await response.json();
      

      if (data && data.Users) {  
        setUsers(data.Users);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const showUserDetails = (user) => {
    setExpandedUser(user);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>

      {/* Get All Users Button */}
      <TouchableOpacity style={styles.getAllUsersButton} onPress={getAllUsers}>
        <Ionicons name="people-outline" size={24} color="#4FADF5" style={styles.icon} />
        <Text style={styles.getAllUsersText}>Get All Users</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#4FADF5" style={{ marginTop: 20 }} />}

      {/* Users List */}
      {!loading && users.length > 0 && (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => showUserDetails(item)}
            >
              <Text style={styles.userName}>{item.First_Name} {item.Last_Name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal for displaying user details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {expandedUser && (
              <>
                <Text style={styles.modalTitle}>{expandedUser.First_Name} {expandedUser.Last_Name}</Text>
                <Text style={styles.modalText}>Email: {expandedUser.Email_adress}</Text>
                <Text style={styles.modalText}>Phone: {expandedUser.Phone_Number}</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Additional Actions - dynamically positioned */}
      <View style={[styles.actionsContainer, { marginTop: (users.length || 0) * 60 }]}>
        <TouchableOpacity style={styles.userActionItem} onPress={() => console.log("Updating user...")}>
          <MaterialIcons name="edit" size={24} color="#4FADF5" style={styles.icon} />
          <Text style={styles.userActionText}>Update a User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.userActionItem} onPress={() => console.log("Removing user...")}>
          <MaterialIcons name="delete-outline" size={24} color="#4FADF5" style={styles.icon} />
          <Text style={styles.userActionText}>Remove a User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3D4F5C',
    marginBottom: 20,
  },
  getAllUsersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '80%',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  getAllUsersText: {
    fontSize: 18,
    color: '#3D4F5C',
  },
  icon: {
    marginRight: 10,
  },
  userItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '80%',
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userName: {
    fontSize: 16,
    color: '#3D4F5C',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3D4F5C',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  actionsContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  userActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userActionText: {
    fontSize: 18,
    color: '#3D4F5C',
  },
});

export default UsersPanel;
