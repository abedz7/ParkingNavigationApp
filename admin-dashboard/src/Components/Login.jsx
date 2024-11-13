import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ setAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            // Authenticate the user
            const loginResponse = await fetch('https://spotcker.onrender.com/api/Users/authenticateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email_adress: email,
                    Password: password,
                }),
            });
    
            if (!loginResponse.ok) {
                const loginData = await loginResponse.json();
                setError(loginData.error || 'Authentication failed');
                setLoading(false);
                return;
            }
    
            // Fetch user data upon successful authentication
            const userResponse = await fetch(`https://spotcker.onrender.com/api/Users/getUserByEmail/${email.toLowerCase()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!userResponse.ok) {
                const userData = await userResponse.json();
                setError(userData.error || 'Failed to fetch user details');
                setLoading(false);
                return;
            }
    
            const userData = await userResponse.json();
            setAdmin(userData.user); // Pass admin data to parent state
            navigate('/admin'); // Redirect to Admin Panel
        } catch (error) {
            console.error("Login Error:", error);
            setError('Error: Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow-lg">
                        <Card.Body>
                            <h2 className="text-center mb-4">Admin Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formBasicEmail" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </InputGroup>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
