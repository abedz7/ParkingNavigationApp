import { Request, Response } from "express";
import { getAll, getById, createNewUser, update , deleteUserById ,getUserByEmail, updateCars , getUserCarsById , handleForgotPassword ,updateUserPassword} from "./Users.model";
import { ObjectId } from "mongodb";
import { comparePassword , hashPassword } from "./Users.HashUtilities";

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
 * Retrieves a specific user by their email address.
 */
export async function getUserByEmailadress(req: Request, res: Response) {
    try {
        const { email } = req.params;  

        if (!email) {
            return res.status(400).json({ error: 'Email address is required' });
        }

        const user = await getUserByEmail(email.toLowerCase());  

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the user' });
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
        if (!Email_adress)
            return res.status(400).json({ error: 'Email Address is required' });
        if (!First_Name)
            return res.status(400).json({ error: 'First Name is required' });
        if (!Last_Name)
            return res.status(400).json({ error: 'Last Name is required' });       
        if (!Phone_Number)
            return res.status(400).json({ error: 'Phone Number is required' });
        if (!Cars || Cars.length === 0)
            return res.status(400).json({ error: 'At least one car is required' });
        if (!Password)
            return res.status(400).json({ error: 'Password is required' });

        let result = await update(new ObjectId(id), First_Name, Last_Name, Email_adress, Phone_Number, Cars, Password, IsAdmin, HaveDisabledCretificate, IsMom);

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
        const Email_adress = req.body.Email_adress.toLowerCase(); // Convert email to lowercase
        const Password = req.body.Password;

        const User = await getUserByEmail(Email_adress); // Search by email
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
 * Deletes a user by their unique identifier.
 */
export async function deleteUser(req: Request, res: Response) {
    try {
        let { id } = req.params;
        if (id.length != 24)
            return res.status(403).json({ error: 'Invalid User ID' });

        let result = await deleteUserById(id);
        if (result.deletedCount === 0)
            res.status(404).json({ error: 'User Not Found' });
        else
            res.status(200).json({ message: 'User Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Updates the cars of a specific user in the database.
 */
export async function updateUserCars(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { Cars } = req.body;

        if (id.length != 24) return res.status(403).json({ error: 'Invalid User ID' });
        if (!Cars || !Array.isArray(Cars)) return res.status(400).json({ error: 'Cars must be an array' });

        let result = await updateCars(new ObjectId(id), Cars);

        if (result.modifiedCount == 0) res.status(404).json({ error: 'User Not Found' });
        else res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Retrieves the cars associated with a specific user by their ID.
 */
export async function getUserCars(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (id.length !== 24) {
            return res.status(403).json({ error: 'Invalid User ID' });
        }

        const cars = await getUserCarsById(id);

        if (!cars) {
            return res.status(404).json({ error: 'User or cars not found' });
        }

        res.status(200).json({ cars });
    } catch (error) {
        res.status(500).json({ error });
    }
}


/**
 * Initiates a process for users to reset their forgotten passwords.
 */
export async function forgotPassword(req: Request, res: Response) {
    try {
        const { Email_adress } = req.body;
        await handleForgotPassword(Email_adress);
        res.status(200).json({ message: 'Temporary password sent to your email' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Updates a user's password by their ID.
 */
export async function changeUserPassword(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { Password } = req.body;

        if (id.length !== 24)
            return res.status(403).json({ error: 'Invalid User ID' });

        if (!Password)
            return res.status(400).json({ error: 'Password is required' });

        const hashedPassword = await hashPassword(Password);
        const result = await updateUserPassword(new ObjectId(id), hashedPassword);

        if (result.modifiedCount === 0)
            res.status(404).json({ error: 'User Not Found' });
        else
            res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
