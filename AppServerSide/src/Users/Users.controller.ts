import { Request, Response } from "express";
import { getAll, getById, createNewUser, update } from "./Users.model";
import { ObjectId } from "mongodb";
import { comparePassword } from "./Users.utils";

/**
 * Retrieves all users from the database.
 */
export async function getAllUsers(req: Request, res: Response) {
    try {

        let Users = await getAll();
        res.status(200).json({ Users });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * 
 * Retrieves a specific user by their unique identifier.
 */
export async function getUserById(req: Request, res: Response) {
    try {
        let { id } = req.params;
        if (id.length != 24)
            return res.status(403).json({ error: 'Invalid User ID' });

        let User = await getById(id);
        if (!User)
            res.status(404).json({ error: 'User Not Found' });
        else
            res.status(200).json({ User });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Creates a new user in the database.
 */
export async function createUser(req: Request, res: Response) {
    try {
        let User = req.body;
        let createdUser = await createNewUser(User);
        res.status(201).json({ createdUser });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Updates an existing user's details in the database.
 */
export async function updateUser(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let {
            First_Name,
            Last_Name,
            Email_adress,
            Phone_Number,
            Cars,
            Password,
            IsAdmin,
            HaveDisabledCretificate,
            IsMom
        } = req.body;
        if (id.length != 24)
            return res.status(403).json({ error: 'Invalid User ID' });
        if (!First_Name)
            return res.status(400).json({ error: 'First Name is required' });
        if (!Last_Name)
            return res.status(400).json({ error: 'Last Name is required' });
        if (!Email_adress)
            return res.status(400).json({ error: 'Email Address is required' });
        if (!Phone_Number)
            return res.status(400).json({ error: 'Phone Number is required' });
        if (!Cars || Cars.length === 0)
            return res.status(400).json({ error: 'At least one car is required' });
        if (!Password)
            return res.status(400).json({ error: 'Password is required' });

        let result = await update(new ObjectId(id), First_Name, Last_Name, Email_adress, Phone_Number, Cars, Password, IsAdmin, HaveDisabledCretificate, IsMom); // Convert id to ObjectId

        if (result.modifiedCount == 0)
            res.status(404).json({ error: 'User Not Found' });
        else
            res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Handles user login, typically checks credentials and returns a token.
 */
export async function authenticateUser(req: Request, res: Response) {
    try {
        const { Email_adress, Password } = req.body;
        const User = await getById(Email_adress); // assuming getById can search by email too
        if (!User) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await comparePassword(Password, User.Password);
        if (!isMatch) {
            return res.status(403).json({ error: 'Invalid credentials' });
        }

        // Generate token (if using JWT or similar)
        // const token = generateToken(User);

        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Initiates a process for users to reset their forgotten passwords.
 */
export async function forgotPassword(req: Request, res: Response) {
    res.send('Password Reset Link Sent');
}
