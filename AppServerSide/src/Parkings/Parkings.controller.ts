import { Request, Response } from "express";
import {
    addParking,
    removeParking,
    getParkingById,
    updateParking,
    getParkingsByUserId
} from "./Parkings.model";

/**
 * Add a parking record.
 */
export async function addParkingController(req: Request, res: Response) {
    try {
        const newParking = req.body;
        const addedParking = await addParking(newParking);
        res.status(201).json({ addedParking });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Remove a parking record by ID.
 */
export async function removeParkingController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await removeParking(id);
        res.status(200).json({ message: 'Parking removed', result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Get a parking record by ID.
 */
export async function getParkingByIdController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const parking = await getParkingById(id);
        res.status(200).json({ parking });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Update a parking record by ID.
 */
export async function updateParkingController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedParking = await updateParking(id, updateData);
        res.status(200).json({ updatedParking });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Get all parking records by User ID.
 */
export async function getParkingsByUserIdController(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const parkings = await getParkingsByUserId(userId);
        res.status(200).json({ parkings });
    } catch (error) {
        res.status(500).json({ error });
    }
}
