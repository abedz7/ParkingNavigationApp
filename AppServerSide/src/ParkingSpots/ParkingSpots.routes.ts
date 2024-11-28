import { Router } from 'express';
import {
    addParkingSpotController,
    removeParkingSpotController,
    getParkingSpotsByLotIdController,
    updateParkingSpotController,
    addMultipleParkingSpotsController,
    getParkingSpotsByLotNameController,
    getAllParkingSpotsController,
    getLotNameBySpotIdController // Import the new controller function
} from './ParkingSpots.controller';

const parkingSpotsRouter = Router();
// Get all parking spots
parkingSpotsRouter.get('/getAllSpots', getAllParkingSpotsController);

// Add a single parking spot
parkingSpotsRouter.post('/addParkingSpot', addParkingSpotController);

// Get lot name by spot ID
parkingSpotsRouter.get('/getLotNameBySpotId/:spotId', getLotNameBySpotIdController);

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
