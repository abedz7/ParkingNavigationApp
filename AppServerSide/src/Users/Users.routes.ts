import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, authenticateUser, forgotPassword ,getUserByEmailadress, deleteUser , updateUserCars , getUserCars, changeUserPassword} from '../Users/Users.controller';

const UsersRouter = Router();

// Retrieve all users
UsersRouter.get('/getAllUsers', getAllUsers);

// Retrieve a specific user by ID
UsersRouter.get('/getUserById/:id', getUserById);

// Get cars associated with a specific user by ID
UsersRouter.get('/getUserCars/:id', getUserCars);

// Retrieve a specific user by email
UsersRouter.get('/getUserByEmail/:email', getUserByEmailadress);

// Create a new user
UsersRouter.post('/createUser', createUser);

// Update an existing user
UsersRouter.put('/updateUser/:id', updateUser);

// Authenticate a user
UsersRouter.post('/authenticateUser', authenticateUser);

// Delete a user by ID
UsersRouter.delete('/deleteUser/:id', deleteUser);

// Update cars for a specific user
UsersRouter.put('/updateUserCars/:id', updateUserCars);

// Handle forgotten password scenario
UsersRouter.post('/forgotPassword', forgotPassword);

// Change user password
UsersRouter.put('/changePassword/:id', changeUserPassword);


export default UsersRouter;
