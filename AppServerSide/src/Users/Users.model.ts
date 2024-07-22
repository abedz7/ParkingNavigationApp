import { ObjectId } from "mongodb";
import { getUsers } from "./Users.db";
import { User } from "./Users.Type";

export async function getAll() {

    return await getUsers();
}