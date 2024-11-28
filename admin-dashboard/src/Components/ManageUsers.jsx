// src/Components/ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://spotcker.onrender.com/api/Users/getAllUsers');
                const data = await response.json();
                
                console.log("Fetched data:", data); // Log the data to check structure
                
                if (response.ok) {
                    if (data.Users && Array.isArray(data.Users)) {
                        setUsers(data.Users); // Adjust to access the Users array within the response
                    } else {
                        setError('Unexpected data format received from server');
                    }
                } else {
                    setError(data.error || 'Failed to fetch users');
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setError('An error occurred while fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`https://spotcker.onrender.com/api/Users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter((user) => user._id !== userId));
                alert('User deleted successfully');
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert('An error occurred while deleting the user');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Manage Users</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="d-flex justify-content-center mt-4">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.First_Name} {user.Last_Name}</td>
                                    <td>{user.Email_adress || user.Email_Address}</td> {/* Adjusted for both field variations */}
                                    <td>{user.Phone_Number}</td>
                                    <td>
                                        <Button variant="warning" className="me-2">
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default ManageUsers;
