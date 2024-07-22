import { ObjectId } from "mongodb";
import { getUsers ,  AddUser } from "./Users.db";
import { User } from "./Users.Type";

// async function to get all users
export async function getAll() {

    return await getUsers();
}

// async function to get a specefic user by id
export async function getById(id:string) {
    let query = { _id: new ObjectId(id) };
    let [User] = await getUsers(query);
    return User;
}

// async function to create a new user
export async function createNewUser(User: User) {
    let newUser : User = {
        _id: new ObjectId(),
        First_Name: User.First_Name,
        Email_adress: User.Email_adress,
        Password: User.Password,
        Last_Name: User.Last_Name,
        Phone_Number: User.Phone_Number,
        Cars: User.Cars,
        IsAdmin: User.IsAdmin,
        HaveDisabledCretificate: User.HaveDisabledCretificate,
        IsMom: User.IsMom
    }
    return await AddUser(newUser);
}