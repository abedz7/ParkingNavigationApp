import { MongoClient, ObjectId } from "mongodb";
import { ParkingLot } from "./ParkingLots.Type";

const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME as string,
    Collection: 'ParkingLots'
};

// Function to get all parking lots or a specific one by query
export async function getParkingLotsFromDb(query = {}) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).find(query).toArray();
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Function to add a new parking lot
export async function addParkingLotToDb(parkingLot: ParkingLot) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).insertOne(parkingLot);
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Function to update an existing parking lot by ID
export async function updateParkingLotInDb(id: string, updatedFields: Partial<ParkingLot>) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedFields }
        );
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Function to remove a parking lot by ID
export async function removeParkingLotFromDb(id: string) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null) mongo.close();
    }
}
