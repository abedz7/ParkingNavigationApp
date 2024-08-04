import { ObjectId } from "mongodb";

export type ParkingSpot = {
    _id?: ObjectId,
    Parking_Lot_ID: ObjectId,
    Spot_Number: string,
    Is_Available: boolean,
    Reserved_By_User_ID?: ObjectId | null,
    Spot_Type: 'Regular' | 'Mother' | 'DisabledPerson',
};
