import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // For editing and deleting
    const [formValues, setFormValues] = useState({ firstName: '', email: '', phoneNumber: '' });

    // Fetch Users
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://spotcker.onrender.com/api/Users/getAllUsers');
                const data = await response.json();

                if (response.ok) {
                    setUsers(data.Users || []); // Adjust for API response structure
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

    // Handle Delete Confirmation
    const handleDeleteConfirmation = (user) => {
        setSelectedUser(user);
        setShowDeleteConfirmation(true);
    };

    // Handle Delete User
    const handleDelete = async () => {
        try {
            const response = await fetch(
                `https://spotcker.onrender.com/api/Users/deleteUser/${selectedUser._id}`,
                { method: 'DELETE' }
            );
            if (response.ok) {
                setUsers(users.filter((user) => user._id !== selectedUser._id));
                alert('User deleted successfully');
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert('An error occurred while deleting the user');
        } finally {
            setShowDeleteConfirmation(false);
        }
    };

    // Handle Edit Button
    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormValues({
            firstName: user.First_Name || '',
            email: user.Email_adress || '',
            phoneNumber: user.Phone_Number || '',
        });
        setShowEditModal(true);
    };

    // Handle Update User
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://spotcker.onrender.com/api/Users/updateUser/${selectedUser._id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        First_Name: formValues.firstName,
                        Email_adress: formValues.email,
                        Phone_Number: formValues.phoneNumber,
                    }),
                }
            );

            if (response.ok) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === selectedUser._id
                            ? { ...user, ...formValues }
                            : user
                    )
                );
                alert('User updated successfully');
            } else {
                alert('Failed to update user');
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert('An error occurred while updating the user');
        } finally {
            setShowEditModal(false);
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
                                    <td>{user.Email_adress || user.Email_Address}</td>
                                    <td>{user.Phone_Number}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteConfirmation(user)}
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

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteConfirmation}
                onHide={() => setShowDeleteConfirmation(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {selectedUser?.First_Name} {selectedUser?.Last_Name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formFirstName" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formValues.firstName}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, firstName: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formValues.email}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, email: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={formValues.phoneNumber}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, phoneNumber: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManageUsers;
