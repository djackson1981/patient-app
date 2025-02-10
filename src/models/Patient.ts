import { Address } from "./Address";

export interface Patient {
    Id : number;
    FirstName: string;
    LastName: string;
    DOB: string;
    Email: string;
    Address : Address;
}