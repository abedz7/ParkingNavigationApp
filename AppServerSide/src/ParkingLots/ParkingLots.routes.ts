import { Router } from 'express';
import { getAllParkingLotsController, getParkingLotByIdController, addParkingLotController, updateParkingLotController, removeParkingLotController } from './ParkingLots.Controller';

const ParkingLotsRouter = Router();

// Retrieve all parking lots
ParkingLotsRouter.get('/getAllParkingLots', getAllParkingLotsController);

// Retrieve a specific parking lot by ID
ParkingLotsRouter.get('/getParkingLotById/:id', getParkingLotByIdController);

// Add a new parking lot
ParkingLotsRouter.post('/addParkingLot', addParkingLotController);

// Update an existing parking lot by ID
ParkingLotsRouter.put('/updateParkingLot/:id', updateParkingLotController);

// Remove a parking lot by ID
ParkingLotsRouter.delete('/removeParkingLot/:id', removeParkingLotController);

export default ParkingLotsRouter;
