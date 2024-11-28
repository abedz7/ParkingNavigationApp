import { Collection, MongoClient, ObjectId } from "mongodb";
import { ParkingSpot } from "./ParkingSpots.type";
const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME as string,
    Collection: 'ParkingSpots',
    Collection2: 'ParkingLots'
};

/**
 * Get all parking spots from the database.
 */
export async function getAllParkingSpotsFromDb(): Promise<ParkingSpot[]> {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();

        return await mongo
            .db(DB_INFO.db)
            .collection<ParkingSpot>(DB_INFO.Collection)
            .find({})
            .toArray();
    } finally {
        if (mongo) mongo.close();
    }
}

/**
 * Get lot name by Spot ID from the database.
 */
export async function getLotNameBySpotIdFromDb(spotId: ObjectId): Promise<string | null> {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();

        // Find the spot document by Spot ID
        const spot = await mongo
            .db(DB_INFO.db)
            .collection(DB_INFO.Collection)
            .findOne({ _id: spotId });

        if (!spot || !spot.Parking_Lot_ID) {
            throw new Error("Spot or Parking Lot ID not found");
        }

        // Fetch the lot name using Parking_Lot_ID
        const lot = await mongo
            .db(DB_INFO.db)
            .collection(DB_INFO.Collection2) 
            .findOne({ _id: spot.Parking_Lot_ID });

        return lot?.Name || null; 
    } finally {
        if (mongo) mongo.close();
    }
}

// Add a single parking spot to the database
export async function addParkingSpotToDb(spot: ParkingSpot) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).insertOne(spot);
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Remove a parking spot by ID from the database
export async function removeParkingSpotFromDb(id: ObjectId) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).deleteOne({ _id: id });
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Get parking spots by parking lot ID from the database
export async function getParkingSpotsByLotIdFromDb(lotId: ObjectId) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).find({ Parking_Lot_ID: lotId }).toArray();
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Get parking spots by parking lot name from the database
export async function getParkingSpotsByLotNameFromDb(lotName: string) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        // First, find the parking lot ID by its name
        const lot = await mongo.db(DB_INFO.db).collection('ParkingLots').findOne({ Name: lotName });
        if (!lot) {
            return [];
        }
        // Then, find all parking spots by parking lot ID
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).find({ Parking_Lot_ID: lot._id }).toArray();
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Update a parking spot by ID in the database
export async function updateParkingSpotInDb(id: ObjectId, updateData: Partial<ParkingSpot>) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).updateOne(
            { _id: id },
            { $set: updateData }
        );
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Get the count of parking spots by type in a specific parking lot
export async function getParkingSpotsCountByType(lotId: ObjectId, spotType: string) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).countDocuments({ Parking_Lot_ID: lotId, Spot_Type: spotType });
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Add multiple parking spots to the database
export async function addMultipleParkingSpotsToDb(spots: ParkingSpot[]) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).insertMany(spots);
    } finally {
        if (mongo != null) mongo.close();
    }
}
