import { ObjectId } from "mongodb";
import { getUsers, AddUser, userUpdate } from "./Users.db";
import { User, Car } from "./Users.Type";
import { hashPassword } from "./Users.utils";

/**
 * Retrieves all users from the database.
 */
export async function getAll() {
    return await getUsers();
}

/**
 * Retrieves a specific user by their unique identifier.
 * @param id - The ID of the user to retrieve.
 */
export async function getById(id: string) {
    let query: any = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { Email_adress: id };
    let User = await getUsers(query);
    return User[0]; // Return the first user found
}

/**
 * Creates a new user in the database.
 * @param User - The user data to create.
 */
export async function createNewUser(User: User) {
    let hashedPassword = await hashPassword(User.Password);
    let newUser: User = {
        _id: new ObjectId(),
        First_Name: User.First_Name,
        Email_adress: User.Email_adress,
        Password: hashedPassword,
        Last_Name: User.Last_Name,
        Phone_Number: User.Phone_Number,
        Cars: User.Cars,
        IsAdmin: User.IsAdmin,
        HaveDisabledCretificate: User.HaveDisabledCretificate,
        IsMom: User.IsMom
    };
    return await AddUser(newUser);
}

/**
 * Updates an existing user's details in the database.
 * @param _id - The ID of the user to update.
 * @param First_Name - The first name of the user.
 * @param Last_Name - The last name of the user.
 * @param Email_adress - The email address of the user.
 * @param Phone_Number - The phone number of the user.
 * @param Cars - The list of cars associated with the user.
 * @param Password - The password of the user.
 * @param IsAdmin - Whether the user is an admin.
 * @param HaveDisabledCretificate - Whether the user has a disabled certificate.
 * @param IsMom - Whether the user is a mom.
 */
export async function update(
    _id: ObjectId,
    First_Name: string,
    Last_Name: string,
    Email_adress: string,
    Phone_Number: string,
    Cars: Array<Car>,
    Password: string,
    IsAdmin: boolean,
    HaveDisabledCretificate: boolean,
    IsMom: boolean
) {
    let User: User = { First_Name, Last_Name, Email_adress, Phone_Number, Cars, Password, IsAdmin, HaveDisabledCretificate, IsMom };
    return await userUpdate(_id.toString(), User);
}
