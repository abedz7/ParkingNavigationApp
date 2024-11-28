import { MongoClient, ObjectId } from "mongodb";
import { Parking } from "./Parkings.Type";

const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME as string,
    Collection: 'Parkings'
};

// Add a parking record to the database
export async function addParkingToDb(parking: Parking) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).insertOne(parking);
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Remove a parking record by ID
export async function removeParkingFromDb(id: ObjectId) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).deleteOne({ _id: id });
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Get a parking record by ID
export async function getParkingByIdFromDb(id: ObjectId) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).findOne({ _id: id });
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Update a parking record by ID
export async function updateParkingInDb(id: ObjectId, updateData: Partial<Parking>) {
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

// Database Function
export async function getParkingsByUserIdFromDb(userId: ObjectId) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).find({ User_ID: userId }).toArray(); 
    } finally {
        if (mongo != null) mongo.close();
    }
}
