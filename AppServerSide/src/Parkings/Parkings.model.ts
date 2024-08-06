import { ObjectId } from "mongodb";
import { Parking } from "./Parkings.Type";
import { addParkingToDb, removeParkingFromDb, getParkingByIdFromDb, updateParkingInDb, getParkingsByUserIdFromDb } from "./Parkings.db";

// Add a parking record
export async function addParking(parking: Parking) {
    return await addParkingToDb(parking);
}

// Remove a parking record by ID
export async function removeParking(id: string) {
    return await removeParkingFromDb(new ObjectId(id));
}

// Get a parking record by ID
export async function getParkingById(id: string) {
    return await getParkingByIdFromDb(new ObjectId(id));
}

// Update a parking record by ID
export async function updateParking(id: string, updateData: Partial<Parking>) {
    return await updateParkingInDb(new ObjectId(id), updateData);
}

// Get all parkings by User ID
export async function getParkingsByUserId(userId: string) {
    return await getParkingsByUserIdFromDb(new ObjectId(userId));
}
