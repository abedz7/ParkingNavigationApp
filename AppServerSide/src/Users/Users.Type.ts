import { ObjectId } from "mongodb";

//
export type User = {
    _id?: ObjectId,
    First_Name: string,
    Last_Name: string,
    Email_adress: string,
    Phone_Number: string,
    Cars:Array<Car>,
    Password: string,
    IsAdmin:boolean,
    HaveDisabledCretificate:boolean
    IsMom:boolean
}

type Car ={
    Company:string,
    Model:string,
    License_Plate:string
}