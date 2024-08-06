import { ObjectId } from "mongodb";

export type Parking = {
    _id?: ObjectId,
    Spot_ID: ObjectId,
    User_ID: ObjectId,
    Start_Date: Date,
    End_Date: Date,
    Start_Time: string,
    End_Time: string
}
