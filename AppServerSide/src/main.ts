import 'dotenv/config'; // apply env vars
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'; // Import the CORS middleware
import UsersRouter from './Users/Users.routes';
import ParkingLotsRouter from './ParkingLots/ParkingLots.routes';
import parkingSpotsRouter from './ParkingSpots/ParkingSpots.routes';
import ParkingsRouter from './Parkings/Parkings.routes';

// Config
const Port = process.env.PORT || 3000;

// Create the server
const server = express();

// Apply CORS middleware with specific origin
server.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Config JSON support
server.use(express.json());

// Using routes
server.use('/api/Users', UsersRouter);
server.use('/api/ParkingLots', ParkingLotsRouter);
server.use('/api/ParkingSpots', parkingSpotsRouter);
server.use('/api/Parkings', ParkingsRouter);

// Run the server
server.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
