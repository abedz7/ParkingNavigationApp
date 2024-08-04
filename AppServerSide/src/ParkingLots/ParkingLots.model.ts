import { ObjectId } from "mongodb";
import { ParkingLot } from "./ParkingLots.Type";
import { getParkingLotsFromDb, addParkingLotToDb, updateParkingLotInDb, removeParkingLotFromDb } from "./ParkingLots.db";

// Get all parking lots
export async function getAllParkingLots() {
    return await getParkingLotsFromDb();
}

// Get a specific parking lot by ID
export async function getParkingLotById(id: string) {
    const query = { _id: new ObjectId(id) };
    return await getParkingLotsFromDb(query);
}

// Add a new parking lot
export async function addParkingLot(parkingLot: ParkingLot) {
    const newParkingLot: ParkingLot = {
        _id: new ObjectId(),
        Name: parkingLot.Name,
        Longitude_Location: parkingLot.Longitude_Location,
        Latitude_Location: parkingLot.Latitude_Location
    };
    return await addParkingLotToDb(newParkingLot);
}

// Update an existing parking lot
export async function updateParkingLot(id: string, updatedFields: Partial<ParkingLot>) {
    return await updateParkingLotInDb(id, updatedFields);
}

// Remove a parking lot by ID
export async function removeParkingLot(id: string) {
    return await removeParkingLotFromDb(id);
}

// Get a parking lot by its name
export async function getParkingLotByName(name: string) {
    return await getParkingLotsFromDb({ Name: name });
}
