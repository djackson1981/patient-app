import { Injectable } from '@angular/core';
import { Patient } from '../models/Patient';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientList: Patient[] = [];

  constructor() { 

  }

  generatePatientData() {
    let dt = new Date();
    for(let ct = 1; ct <= 10; ++ct) {
      let newPatient : Patient = {
        Id: ct,
        FirstName: 'FirstName-' + Math.floor(Math.random() * 10000),
        LastName: 'LastName-' + Math.floor(Math.random() * 10000),
        DOB: '01/01/' + (Math.floor(Math.random() * (2000 - 1950 + 1)) + 1950).toString(),
        Email: Math.floor(Math.random() * 10000) + "@gmail.com",
        Address: this.getAddress(ct)
      }
      this.patientList.push(newPatient);
    }
    this.patientList.sort((a, b) => new Date(a.DOB).getFullYear() - new Date(b.DOB).getFullYear())
  }


  getAddress(id : number) : Address {
    let address : Address = {
      Address1: "Address1-" + id,
      Address2: 'Address2-' + id,
      City: "City-" + id,
      State: "State-" + id,
      Zip: 'Zip-' + id
    }
    return address;
  }
}
