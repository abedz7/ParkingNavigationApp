import { ObjectId } from "mongodb";

export type ParkingLot = {
    _id?: ObjectId,
    Name: string,
    Longitude_Location: number,
    Latitude_Location: number
}
