import { ObjectId } from "mongodb";
import { ParkingSpot } from "./ParkingSpots.type";
import { getAllParkingSpotsFromDb, getLotNameBySpotIdFromDb, addParkingSpotToDb, removeParkingSpotFromDb, getParkingSpotsByLotIdFromDb, updateParkingSpotInDb, getParkingSpotsCountByType, addMultipleParkingSpotsToDb, getParkingSpotsByLotNameFromDb } from "./ParkingSpots.db";

/**
 * Get all parking spots.
 */
export async function getAllParkingSpots(): Promise<ParkingSpot[]> {
    return await getAllParkingSpotsFromDb();
}

/**
 * Get lot name by spot ID.
 */
export async function getLotNameBySpotId(spotId: ObjectId): Promise<string | null> {
    return await getLotNameBySpotIdFromDb(spotId);
}
// Add a single parking spot
export async function addParkingSpot(spot: ParkingSpot) {
    return await addParkingSpotToDb(spot);
}

// Remove a parking spot by ID
export async function removeParkingSpot(id: string) {
    return await removeParkingSpotFromDb(new ObjectId(id));
}

// Get parking spots by parking lot ID
export async function getParkingSpotsByLotId(lotId: string) {
    return await getParkingSpotsByLotIdFromDb(new ObjectId(lotId));
}

// Get parking spots by parking lot name
export async function getParkingSpotsByLotName(lotName: string) {
    return await getParkingSpotsByLotNameFromDb(lotName); // Call the new DB function
}

// Update a parking spot by ID
export async function updateParkingSpot(id: string, updateData: Partial<ParkingSpot>) {
    return await updateParkingSpotInDb(new ObjectId(id), updateData);
}

// Add multiple parking spots
export async function addMultipleParkingSpots(parkingLotId: string, spotType: 'Regular' | 'Mother' | 'DisabledPerson', quantity: number) {
    const parkingLotObjectId = new ObjectId(parkingLotId);
    const existingCount = await getParkingSpotsCountByType(parkingLotObjectId, spotType);

    let newSpots: ParkingSpot[] = [];
    for (let i = 1; i <= quantity; i++) {
        let spotNumber = generateSpotNumber(spotType, existingCount + i);
        newSpots.push({
            Parking_Lot_ID: parkingLotObjectId,
            Spot_Number: spotNumber,
            Is_Available: true,
            Spot_Type: spotType,
            Reserved_By_User_ID: null
        });
    }

    return await addMultipleParkingSpotsToDb(newSpots);
}

// Function to generate spot numbers based on type and count
function generateSpotNumber(spotType: 'Regular' | 'Mother' | 'DisabledPerson', count: number): string {
    if (spotType === 'Regular') {
        const letter = String.fromCharCode(65 + Math.floor((count - 1) / 100)); // A for 1-100, B for 101-200, etc.
        const number = (count).toString().padStart(3, '0');
        return `${letter}${number}`;
    } else if (spotType === 'Mother') {
        return `M${count.toString().padStart(3, '0')}`;
    } else if (spotType === 'DisabledPerson') {
        return `D${count.toString().padStart(3, '0')}`;
    }
    return count.toString();
}
