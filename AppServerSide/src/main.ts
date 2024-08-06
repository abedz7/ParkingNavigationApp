import 'dotenv/config'; // apply env vars
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import UsersRouter from './Users/Users.routes';
import ParkingLotsRouter from './ParkingLots/ParkingLots.routes';
import parkingSpotsRouter from './ParkingSpots/ParkingSpots.routes';
import ParkingsRouter from './Parkings/Parkings.routes';

//config
//process.env.PORT --> the live server port
const PORT = process.env.PORT || 7777; 

//create the server
const server = express();

//config JSON support
server.use(express.json());

//using routes
server.use('/api/Users', UsersRouter);
server.use('/api/ParkingLots',ParkingLotsRouter)
server.use('/api/ParkingSpots',parkingSpotsRouter)
server.use('/api/Parkings',ParkingsRouter)

//run the server
server.listen(PORT, () => console.log(`[Server] http://localhost:${PORT}`));