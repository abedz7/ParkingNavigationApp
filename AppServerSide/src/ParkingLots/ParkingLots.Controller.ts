import { Request, Response } from "express";
import { getAllParkingLots, getParkingLotById, addParkingLot, updateParkingLot, removeParkingLot } from "./ParkingLots.model";

/**
 * Get all parking lots.
 */
export async function getAllParkingLotsController(req: Request, res: Response) {
    try {
        const parkingLots = await getAllParkingLots();
        res.status(200).json({ parkingLots });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Get a specific parking lot by ID.
 */
export async function getParkingLotByIdController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (id.length !== 24) {
            return res.status(403).json({ error: 'Invalid Parking Lot ID' });
        }
        const parkingLot = await getParkingLotById(id);
        if (!parkingLot) {
            res.status(404).json({ error: 'Parking Lot Not Found' });
        } else {
            res.status(200).json({ parkingLot });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Add a new parking lot.
 */
export async function addParkingLotController(req: Request, res: Response) {
    try {
        const parkingLot = req.body;
        const createdParkingLot = await addParkingLot(parkingLot);
        res.status(201).json({ createdParkingLot });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Update an existing parking lot by ID.
 */
export async function updateParkingLotController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (id.length !== 24) {
            return res.status(403).json({ error: 'Invalid Parking Lot ID' });
        }
        const updatedFields = req.body;
        const result = await updateParkingLot(id, updatedFields);
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'Parking Lot Not Found' });
        } else {
            res.status(200).json({ message: 'Parking Lot Updated Successfully' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Remove a parking lot by ID.
 */
export async function removeParkingLotController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (id.length !== 24) {
            return res.status(403).json({ error: 'Invalid Parking Lot ID' });
        }
        const result = await removeParkingLot(id);
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Parking Lot Not Found' });
        } else {
            res.status(200).json({ message: 'Parking Lot Deleted Successfully' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}
