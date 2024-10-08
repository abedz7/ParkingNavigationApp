import { MongoClient, ObjectId } from "mongodb";
import { User , Car } from "./Users.Type";

// Data Base Info That we save in a variable
const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME as string,
    Collection: 'Users'
};

// async function to get all users, and to get a specific user by id
export async function getUsers(query = {}, projection = {}) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).find(query).project(projection).toArray();
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null)
            mongo.close();
    }
}

// async function to create a new user in the database
export async function AddUser(User: User) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).insertOne(User);
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null)
            mongo.close();
    }
}

//function to Update an existing user's details in the database
export async function userUpdate(id: string, User: User) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).updateOne(
            { _id: new ObjectId(id) },
            { $set: User }
        );
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null)
            mongo.close();
    }
}

// async function to delete a user by id
export async function deleteUser(id: ObjectId) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).deleteOne({ _id: id });
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null)
            mongo.close();
    }
}

// async function to update cars of a specific user in the database
export async function updateUserCarsInDb(id: ObjectId, Cars: Array<Car>) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).updateOne(
            { _id: id },
            { $set: { Cars } }
        );
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null) mongo.close();
    }
}

/**
 * Retrieves the cars associated with a specific user from the database.
 * @param userId - The user ID.
 * @returns A promise that resolves to an array of cars or null if not found.
 */
export async function getCarsByUserIdFromDb(userId: string): Promise<Car[] | null> {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();

        const user = await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).findOne({ _id: new ObjectId(userId) });

        if (user && user.Cars) {
            return user.Cars;
        }

        return null;
    } catch (error) {
        throw error;
    } finally {
        if (mongo !== null) {
            mongo.close();
        }
    }
}

// Function to get a user by email
export async function getUserByEmailFromDb(email: string): Promise<User | null> {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        const user = await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).findOne({ Email_adress: email.toLowerCase() });

        if (user) {
            return user as User;
        }
        return null;
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null) mongo.close();
    }
}

// Function to update a user's password
export async function updateUserPasswordInDb(id: ObjectId, hashedPassword: string) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).updateOne(
            { _id: id },
            { $set: { Password: hashedPassword } }
        );
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null) mongo.close();
    }
}

/**
 * Updates a user's password in the database.
 * @param id - The ID of the user whose password is being updated.
 * @param hashedPassword - The new hashed password.
 */
export async function updatePasswordInDb(id: ObjectId, hashedPassword: string) {
    let mongo: MongoClient | null = null;
    try {
        mongo = new MongoClient(DB_INFO.host);
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.Collection).updateOne(
            { _id: id },
            { $set: { Password: hashedPassword } }
        );
    } catch (error) {
        throw error;
    } finally {
        if (mongo != null) mongo.close();
    }
}
