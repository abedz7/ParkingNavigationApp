import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';

const ManageParkingSpots = () => {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [parkingLots, setParkingLots] = useState([]);
    const [formData, setFormData] = useState({
        parkingLotId: '',
        spotType: 'Regular',
        quantity: 1,
    });

    useEffect(() => {
        const fetchParkingSpots = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await fetch('https://spotcker.onrender.com/api/ParkingSpots/getAllSpots');
                const data = await response.json();

                if (response.ok) {
                    // Fetch lot names for each parking spot
                    const spotsWithLotNames = await Promise.all(
                        data.spots.map(async (spot) => {
                            try {
                                const lotNameResponse = await fetch(
                                    `https://spotcker.onrender.com/api/ParkingSpots/getLotNameBySpotId/${spot._id}`
                                );
                                const lotNameData = await lotNameResponse.json();

                                return {
                                    ...spot,
                                    lotName: lotNameResponse.ok ? lotNameData.lotName || 'Unknown' : 'Unknown',
                                };
                            } catch (err) {
                                console.error(`Error fetching lot name for spot ID: ${spot._id}`, err);
                                return { ...spot, lotName: 'Unknown' };
                            }
                        })
                    );

                    setParkingSpots(spotsWithLotNames);
                } else {
                    setError(data.error || 'Failed to fetch parking spots');
                }
            } catch (err) {
                console.error('Error fetching parking spots:', err);
                setError('An error occurred while fetching parking spots');
            } finally {
                setLoading(false);
            }
        };

        const fetchParkingLots = async () => {
            try {
                const response = await fetch('https://spotcker.onrender.com/api/ParkingLots/getAllParkingLots');
                const data = await response.json();

                if (response.ok) {
                    setParkingLots(data.parkingLots || []);
                } else {
                    console.error('Failed to fetch parking lots:', data);
                }
            } catch (err) {
                console.error('Error fetching parking lots:', err);
            }
        };

        // Fetch parking spots and parking lots
        fetchParkingLots();
        fetchParkingSpots();
    }, []);

    const handleAddSpots = async (e) => {
        e.preventDefault();

        if (!formData.parkingLotId || !formData.quantity || !formData.spotType) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch(
                'https://spotcker.onrender.com/api/ParkingSpots/addMultipleParkingSpots',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Parking spots added successfully');
                setShowAddModal(false);

                // Refresh the parking spots list
                const updatedSpots = await fetch('https://spotcker.onrender.com/api/ParkingSpots/getAllSpots');
                const updatedData = await updatedSpots.json();

                if (updatedSpots.ok) {
                    const updatedSpotsWithLotNames = await Promise.all(
                        updatedData.spots.map(async (spot) => {
                            try {
                                const lotNameResponse = await fetch(
                                    `https://spotcker.onrender.com/api/ParkingSpots/getLotNameBySpotId/${spot._id}`
                                );
                                const lotNameData = await lotNameResponse.json();

                                return {
                                    ...spot,
                                    lotName: lotNameResponse.ok ? lotNameData.lotName || 'Unknown' : 'Unknown',
                                };
                            } catch (err) {
                                console.error(`Error fetching lot name for spot ID: ${spot._id}`, err);
                                return { ...spot, lotName: 'Unknown' };
                            }
                        })
                    );

                    setParkingSpots(updatedSpotsWithLotNames);
                }
            } else {
                alert('Failed to add parking spots');
            }
        } catch (err) {
            console.error('Error adding parking spots:', err);
            alert('An error occurred while adding parking spots');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Manage Parking Spots</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="d-flex justify-content-center mt-4">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div>
                    <Button className="mb-3" onClick={() => setShowAddModal(true)}>
                        Add Parking Spots
                    </Button>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Lot Name</th>
                                <th>Spot Number</th>
                                <th>Spot Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkingSpots.length > 0 ? (
                                parkingSpots.map((spot) => (
                                    <tr key={spot._id}>
                                        <td>{spot._id}</td>
                                        <td>{spot.lotName}</td>
                                        <td>{spot.Spot_Number || 'N/A'}</td>
                                        <td>{spot.Spot_Type || 'Unknown'}</td>
                                        <td>
                                            <Button variant="danger">Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No parking spots found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            )}

            {/* Add Spots Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Parking Spots</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddSpots}>
                        <Form.Group controlId="formParkingLotId" className="mb-3">
                            <Form.Label>Select Parking Lot</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.parkingLotId}
                                onChange={(e) =>
                                    setFormData({ ...formData, parkingLotId: e.target.value })
                                }
                            >
                                <option value="">-- Select a Parking Lot --</option>
                                {parkingLots.map((lot) => (
                                    <option key={lot._id} value={lot._id}>
                                        {lot.Name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formSpotType" className="mb-3">
                            <Form.Label>Select Spot Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.spotType}
                                onChange={(e) =>
                                    setFormData({ ...formData, spotType: e.target.value })
                                }
                            >
                                <option value="Regular">Regular</option>
                                <option value="Mother">Mother</option>
                                <option value="DisabledPerson">Disabled Person</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formQuantity" className="mb-3">
                            <Form.Label>Number of Spots</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({ ...formData, quantity: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Spots
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManageParkingSpots;
