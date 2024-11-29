import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';

const ManageParkingLots = () => {
    const [parkingLots, setParkingLots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedParkingLot, setSelectedParkingLot] = useState(null);
    const [formValues, setFormValues] = useState({ name: '', location: '' });
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    // Fetch Parking Lots
    useEffect(() => {
        const fetchParkingLots = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://spotcker.onrender.com/api/ParkingLots/getAllParkingLots');
                const data = await response.json();

                if (response.ok) {
                    setParkingLots(data.parkingLots || []);
                } else {
                    setError(data.error || 'Failed to fetch parking lots');
                }
            } catch (error) {
                console.error('Error fetching parking lots:', error);
                setError('An error occurred while fetching parking lots');
            } finally {
                setLoading(false);
            }
        };

        fetchParkingLots();
    }, []);

    // Geocode address using Nominatim
    const geocodeAddress = async () => {
        try {
            if (!address.trim()) {
                alert('Please enter a valid address.');
                return;
            }

            setLoadingLocation(true);

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();

            if (data.length === 0) {
                throw new Error('No results found for the entered address.');
            }

            const { lat, lon } = data[0];
            setLatitude(lat);
            setLongitude(lon);

            alert(`Address converted to location: Latitude ${lat}, Longitude ${lon}`);
        } catch (error) {
            console.error('Error geocoding address:', error);
            alert('Failed to convert address to location. Please try again.');
        } finally {
            setLoadingLocation(false);
        }
    };

    // Handle Add Parking Lot
    const handleAddParkingLot = async () => {
        if (!formValues.name || !latitude || !longitude) {
            alert('Please complete all fields and confirm the address.');
            return;
        }

        try {
            const response = await fetch('https://spotcker.onrender.com/api/ParkingLots/addParkingLot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Name: formValues.name,
                    Latitude_Location: latitude,
                    Longitude_Location: longitude,
                }),
            });

            if (response.ok) {
                const newParkingLot = await response.json();
                setParkingLots([...parkingLots, newParkingLot]);
                alert('Parking lot added successfully');
                setShowAddModal(false);
            } else {
                alert('Failed to add parking lot');
            }
        } catch (error) {
            console.error('Error adding parking lot:', error);
            alert('An error occurred while adding the parking lot');
        }
    };

    // Handle Edit Parking Lot
    const handleEdit = (parkingLot) => {
        setSelectedParkingLot(parkingLot);
        setFormValues({
            name: parkingLot.Name,
            location: `${parkingLot.Latitude_Location}, ${parkingLot.Longitude_Location}`,
        });
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://spotcker.onrender.com/api/ParkingLots/updateParkingLot/${selectedParkingLot._id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Name: formValues.name,
                        Latitude_Location: latitude || selectedParkingLot.Latitude_Location,
                        Longitude_Location: longitude || selectedParkingLot.Longitude_Location,
                    }),
                }
            );

            if (response.ok) {
                setParkingLots((prevLots) =>
                    prevLots.map((lot) =>
                        lot._id === selectedParkingLot._id
                            ? { ...lot, Name: formValues.name, Latitude_Location: latitude, Longitude_Location: longitude }
                            : lot
                    )
                );
                alert('Parking lot updated successfully');
                setShowEditModal(false);
            } else {
                alert('Failed to update parking lot');
            }
        } catch (error) {
            console.error('Error updating parking lot:', error);
            alert('An error occurred while updating the parking lot');
        }
    };

    // Handle Delete Parking Lot
    const handleDeleteConfirmation = (parkingLot) => {
        setSelectedParkingLot(parkingLot);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `https://spotcker.onrender.com/api/ParkingLots/removeParkingLot/${selectedParkingLot._id}`,
                { method: 'DELETE' }
            );
            if (response.ok) {
                setParkingLots(parkingLots.filter((lot) => lot._id !== selectedParkingLot._id));
                alert('Parking lot deleted successfully');
            } else {
                alert('Failed to delete parking lot');
            }
        } catch (error) {
            console.error('Error deleting parking lot:', error);
            alert('An error occurred while deleting the parking lot');
        } finally {
            setShowDeleteConfirmation(false);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Manage Parking Lots</h2>
            <Button className="mb-3" onClick={() => setShowAddModal(true)}>
                Add Parking Lot
            </Button>
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
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parkingLots.length > 0 ? (
                            parkingLots.map((lot) => (
                                <tr key={lot._id}>
                                    <td>{lot.Name}</td>
                                    <td>{`${lot.Latitude_Location}, ${lot.Longitude_Location}`}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => handleEdit(lot)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteConfirmation(lot)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No parking lots found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Parking Lot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Parking Lot Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formValues.name}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, name: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="secondary"
                            className="mb-3"
                            onClick={geocodeAddress}
                            disabled={loadingLocation}
                        >
                            {loadingLocation ? 'Getting Location...' : 'Confirm Address'}
                        </Button>
                        <Button variant="primary" onClick={handleAddParkingLot}>
                            Add Parking Lot
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Parking Lot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Parking Lot Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formValues.name}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, name: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="secondary"
                            className="mb-3"
                            onClick={geocodeAddress}
                            disabled={loadingLocation}
                        >
                            {loadingLocation ? 'Getting Location...' : 'Confirm Address'}
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

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
                    Are you sure you want to delete {selectedParkingLot?.Name} Parking Lot?
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
        </Container>
    );
};

export default ManageParkingLots;
