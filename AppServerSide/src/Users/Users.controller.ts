import { Request, Response } from "express";
import { getAll } from "./Users.model";

/**
 * Retrieves all users from the database.
 */
export async function getAllUsers(req: Request, res: Response) {
   try{
    
    let Users = await getAll();
    res.status(200).json({Users});
   }
   catch(error){
    res.status(500).json({error});
   }
}

/**
 * Retrieves a specific user by their unique identifier.
 */
export async function getUserById(req: Request, res: Response) {
    res.send(`Get User: ${req.params.id}`);
}

/**
 * Creates a new user in the database.
 */
export async function createUser(req: Request, res: Response) {
    res.send('User Created');
}

/**
 * Updates an existing user's details in the database.
 */
export async function updateUser(req: Request, res: Response) {
    res.send(`Update User: ${req.params.id}`);
}

/**
 * Handles user login, typically checks credentials and returns a token.
 */
export async function authenticateUser(req: Request, res: Response) {
    res.send('User Authenticated');
}

/**
 * Initiates a process for users to reset their forgotten passwords.
 */
export async function forgotPassword(req: Request, res: Response) {
    res.send('Password Reset Link Sent');
}
