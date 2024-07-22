import { MongoClient } from "mongodb";
import { User } from "./Users.Type";

// Data Base Info That we save in a variable
const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME,
    Collection: 'Users'
};
// async function to get all users , and to get a specefic user by id
export async function getUsers(query = {}, projection = {}) {
    
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient("mongodb+srv://abedz:R8gWCsGnsRWZAT0X@maincluster.hhcpav0.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster");
        await mongo.connect();
        return await mongo.db("SpotCker").collection(DB_INFO.Collection).find({}).toArray();
    }
    catch (error) {
        

        throw error;
    }
    finally {
        if (mongo != null)
            mongo.close();
    }
}
// async function to create a new user in the database
export async function AddUser(User: User) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient("mongodb+srv://abedz:R8gWCsGnsRWZAT0X@maincluster.hhcpav0.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster");
        await mongo.connect();
        return await mongo.db("SpotCker").collection(DB_INFO.Collection).insertOne(User);
    }
    catch (error) {
        throw error;
    }
    finally {
        if (mongo != null)
            mongo.close();
    }
}

