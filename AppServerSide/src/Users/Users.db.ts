import { MongoClient } from "mongodb";

const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME,
    Collection: 'Users'
};

export async function getUsers() {
    
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
