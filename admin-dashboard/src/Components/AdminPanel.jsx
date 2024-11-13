import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

export const AdminPanel = ({ admin }) => {
    if (!admin) {
        return <p>Loading...</p>;
    }

    const initials = `${admin.First_Name.charAt(0)}${admin.Last_Name.charAt(0)}`;

    return (
        <Container fluid className="p-4 bg-light">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-lg mb-4">
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                {/* Avatar */}
                                <div
                                    className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {initials}
                                </div>
                                {/* Admin name and badge */}
                                <div className="ms-3">
                                    <h4 className="mb-0">
                                        {admin.First_Name} {admin.Last_Name}
                                    </h4>
                                    <Badge bg="success" className="ms-2">
                                        Admin
                                    </Badge>
                                </div>
                            </div>

                            {/* Admin details */}
                            <Row>
                                <Col xs={12} className="mb-2">
                                    <strong>Email:</strong> {admin.Email_adress}
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <strong>Phone Number:</strong> {admin.Phone_Number}
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <strong>Cars:</strong>
                                    <ul className="mt-2">
                                        {admin.Cars.map((car, index) => (
                                            <li key={index}>
                                                {car.brand} {car.model} - Plate: {car.plate}
                                            </li>
                                        ))}
                                    </ul>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    {/* Admin action buttons */}
                    <Card className="shadow-lg">
                        <Card.Body>
                            <h5 className="text-center mb-4">Admin Actions</h5>
                            <div className="d-flex flex-column">
                                <Button variant="primary" className="mb-3">
                                    Manage Users
                                </Button>
                                <Button variant="info" className="mb-3">
                                    Manage Parking Lots
                                </Button>
                                <Button variant="secondary" className="mb-3">
                                    View Reports
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;
