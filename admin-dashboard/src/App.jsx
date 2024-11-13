import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import AdminPanel from './Components/AdminPanel';

const App = () => {
    const [admin, setAdmin] = useState(null); 

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        admin ? <Navigate to="/admin" replace /> : <Login setAdmin={setAdmin} />
                    }
                />
                <Route
                    path="/admin"
                    element={
                        admin ? <AdminPanel admin={admin} /> : <Navigate to="/" replace />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
