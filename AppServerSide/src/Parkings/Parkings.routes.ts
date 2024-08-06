import { Router } from 'express';
import {
    addParkingController,
    removeParkingController,
    getParkingByIdController,
    updateParkingController,
    getParkingsByUserIdController
} from './Parkings.controller';

const ParkingsRouter = Router();

// Add a parking record
ParkingsRouter.post('/addParking', addParkingController);

// Remove a parking record by ID
ParkingsRouter.delete('/removeParking/:id', removeParkingController);

// Get a parking record by ID
ParkingsRouter.get('/getParkingById/:id', getParkingByIdController);

// Update a parking record by ID
ParkingsRouter.put('/updateParking/:id', updateParkingController);

// Get all parking records by User ID
ParkingsRouter.get('/getParkingsByUserId/:userId', getParkingsByUserIdController);

export default ParkingsRouter;
