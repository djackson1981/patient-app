import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/Patient';
import { CommonModule } from '@angular/common';
import { FilterType } from '../../models/FilterType';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-patient-component',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './patient-component.component.html',
  styleUrl: './patient-component.component.css'
})
export class PatientComponent implements OnInit {
  patientService: PatientService;
  FilterType = FilterType;
  txtId : string = '';
  txtName : string = '';
  txtDOB : string = '';
  txtEmail : string = '';
  splitYear : string = '';
  selectedListSort : string = "0";
  patientList: Patient[] = [];
  olderYearsList: Patient[] = [];
  newerYearsList: Patient[] = [];

  constructor(patientService : PatientService) {
    this.patientService = patientService;
    this.patientList = patientService.patientList;
  }

  ngOnInit() {
    this.patientService.generatePatientData();
  }

  reset() {
    this.txtId = '';
    this.txtName = '';
    this.txtDOB = '';
    this.txtEmail = ''
    this.patientList = [...this.patientService.patientList];
  }

  changePatientList() { 
    if(this.selectedListSort == "0")
      this.patientList = this.patientService.patientList
    if(this.selectedListSort == "1")
      this.patientList = this.olderYearsList
    if(this.selectedListSort == "2")
      this.patientList = this.newerYearsList
  }

  splitPatientList(year : any) {
    year = Number(year);
    let copyOfPatientList = [...this.patientService.patientList];
    let yearOnlyList = [...copyOfPatientList.map(p => new Date(p.DOB).getFullYear())];
   
    var closestYear = yearOnlyList.reduce(function(prev, curr) {
      return (Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev);
    });

    copyOfPatientList.sort((a, b) => new Date(a.DOB).getFullYear() - new Date(b.DOB).getFullYear());
    let splitIndex = yearOnlyList.indexOf(closestYear);
    
    this.olderYearsList = [...copyOfPatientList.splice(0,splitIndex)];
    this.olderYearsList.forEach(p => console.log(p.DOB))
   
    this.newerYearsList = [...copyOfPatientList];
    this.newerYearsList.forEach(p => console.log(p.DOB))

    this.changePatientList();
  }

  filterData(filterType : FilterType, value : string) {
    value = value.toLowerCase();
    //this.patientList = this.patientService.patientList;
    switch (filterType) {
      case FilterType.Id:
        this.patientList = this.patientList.filter(p => p.Id.toString().toLowerCase().includes(value))
        break;
      case FilterType.Name:
        this.patientList = this.patientList.filter(p => {
          let fullName = p.FirstName.toLowerCase() + ' ' + p.LastName.toUpperCase();
          return fullName.includes(value);
       });
        break;
      case FilterType.DOB:
        this.patientList = this.patientList.filter(p => p.DOB.includes(value));
        break;
      case FilterType.Email:
        this.patientList = this.patientList.filter(p => p.Email.toLowerCase().includes(value));
        break;
      default:
        this.patientList = this.patientService.patientList;
    }
  }
}
