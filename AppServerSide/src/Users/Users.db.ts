import { Collection, MongoClient } from "mongodb";

const DB_INFO = {
    host : process.env.CONNECTION_STRING,
    db : process.env.DB_NAME,
    Collection : 'SpotCker'
}
