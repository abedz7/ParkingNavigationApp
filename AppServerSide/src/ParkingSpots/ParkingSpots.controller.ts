import { Request, Response } from "express";
import {
    addParkingSpot,
    removeParkingSpot,
    getParkingSpotsByLotId,
    updateParkingSpot,
    addMultipleParkingSpots,
    getParkingSpotsByLotName,
    getAllParkingSpots,
    getLotNameBySpotId
} from "./ParkingSpots.model";
import { ObjectId } from "mongodb";

/**
 * Get all parking spots.
 */
export async function getAllParkingSpotsController(req: Request, res: Response) {
    try {
      const spots = await getAllParkingSpots();
      res.status(200).json({ spots });
    } catch (error) {
      console.error('Error fetching parking spots:', error);
      res.status(500).json({ error: 'Failed to fetch parking spots' });
    }
  }

  /**
 * Get lot name by spot ID.
 */
export async function getLotNameBySpotIdController(req: Request, res: Response) {
    try {
        const { spotId } = req.params;
        const lotName = await getLotNameBySpotId(new ObjectId(spotId));
        res.status(200).json({ lotName });
    } catch (error) {
        console.error("Error fetching lot name:", error);
        res.status(500).json({ error: "Failed to fetch lot name" });
    }
}

/**
 * Add a single parking spot.
 */
export async function addParkingSpotController(req: Request, res: Response) {
    try {
        const newSpot = req.body;
        const addedSpot = await addParkingSpot(newSpot);
        res.status(201).json({ addedSpot });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Remove a parking spot by ID.
 */
export async function removeParkingSpotController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await removeParkingSpot(id);
        res.status(200).json({ message: 'Parking Spot removed', result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Get parking spots by parking lot ID.
 */
export async function getParkingSpotsByLotIdController(req: Request, res: Response) {
    try {
        const { lotId } = req.params;
        const spots = await getParkingSpotsByLotId(lotId);
        res.status(200).json({ spots });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Get parking spots by parking lot name.
 */
export async function getParkingSpotsByLotNameController(req: Request, res: Response) {
    try {
        const { lotName } = req.params;
        const spots = await getParkingSpotsByLotName(lotName);
        res.status(200).json({ spots });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Update a parking spot by ID.
 */
export async function updateParkingSpotController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedSpot = await updateParkingSpot(id, updateData);
        res.status(200).json({ updatedSpot });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Add multiple parking spots.
 */
export async function addMultipleParkingSpotsController(req: Request, res: Response) {
    try {
        const { parkingLotId, spotType, quantity } = req.body;
        const addedSpots = await addMultipleParkingSpots(parkingLotId, spotType, quantity);
        res.status(201).json({ addedSpots });
    } catch (error) {
        res.status(500).json({ error });
    }
}
