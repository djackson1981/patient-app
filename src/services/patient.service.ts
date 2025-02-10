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
        DOB: '1/1/' + (Math.floor(Math.random() * (2000 - 1950 + 1)) + 1950).toString(),
        Email: ct + "@gmail.com",
        Address: this.getAddress(ct)
      }

      this.patientList.push(newPatient);
    }
  }


  getAddress(id : number) : Address {
    let address : Address = {
      Address1: "Address1-" + id,
      Address2: '',
      City: "City-" + id,
      State: "State-" + id,
      Zip: 'Zip-' + id
    }
    return address;
  }
}
