// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import AdminPanel from './Components/AdminPanel';
import ManageUsers from './Components/ManageUsers';

function App() {
    const [admin, setAdmin] = useState(null); 

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setAdmin={setAdmin} />} />
                <Route
                    path="/admin"
                    element={admin ? <AdminPanel admin={admin} /> : <Navigate to="/" replace />}
                />
                <Route
                    path="/manage-users"
                    element={admin ? <ManageUsers /> : <Navigate to="/" replace />}
                />
            </Routes>
        </Router>
    );
}

export default App;
