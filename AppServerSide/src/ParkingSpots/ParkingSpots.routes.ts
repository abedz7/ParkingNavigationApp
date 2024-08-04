import { Router } from 'express';
import {
    addParkingSpotController,
    removeParkingSpotController,
    getParkingSpotsByLotIdController,
    updateParkingSpotController,
    addMultipleParkingSpotsController,
    getParkingSpotsByLotNameController // Import the new controller function
} from './ParkingSpots.controller';

const parkingSpotsRouter = Router();

// Add a single parking spot
parkingSpotsRouter.post('/addParkingSpot', addParkingSpotController);

// Remove a parking spot by ID
parkingSpotsRouter.delete('/removeParkingSpot/:id', removeParkingSpotController);

// Get parking spots by parking lot ID
parkingSpotsRouter.get('/getParkingSpotsByLotId/:lotId', getParkingSpotsByLotIdController);

// Get parking spots by parking lot name
parkingSpotsRouter.get('/getParkingSpotsByLotName/:lotName', getParkingSpotsByLotNameController); // New route

// Update a parking spot by ID
parkingSpotsRouter.put('/updateParkingSpot/:id', updateParkingSpotController);

// Add multiple parking spots
parkingSpotsRouter.post('/addMultipleParkingSpots', addMultipleParkingSpotsController);

export default parkingSpotsRouter;
