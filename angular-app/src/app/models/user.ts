import { Covtest } from './covtest';

export class User {
    _id: string;
    name: string;
    address: string;
    age: number;
    email: string;
    password: string;
    phoneNumber: number;
    infected: boolean;
    idCard: string;
    role: string;
    covtest: Array<Covtest>;
    updated_at: string;

    constructor(name:string, address: string, age: number, email: string, password: string, phoneNumber: number, 
        infected?: boolean, covtest?: Array<Covtest>){

        this.name = name;
        this.address = address;
        this.age = age;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.infected = infected;
        this.covtest = covtest;
        
    }

}

