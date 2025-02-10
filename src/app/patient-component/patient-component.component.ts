import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/Patient';
import { CommonModule } from '@angular/common';
import { FilterType } from '../../models/FilterType';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-patient-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  patientList: Patient[] = [];
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
    this.patientList = this.patientService.patientList;
  }

  filterData(filterType : FilterType, value : string) {
    //this.patientList = this.patientService.patientList;
    switch (filterType) {
      case FilterType.Id:
        this.patientList = this.patientList.filter(p => p.Id.toString().includes(value))
        break;
      case FilterType.Name:
        this.patientList = this.patientList.filter(p => {
          let fullName = p.FirstName + p.LastName;
          return fullName.includes(value);
       })
        
        break;
      case FilterType.DOB:
        this.patientList = this.patientList.filter(p => p.DOB.includes(value));
        break;
      case FilterType.Email:
        this.patientList = this.patientList.filter(p => p.Email.includes(value));
        break;
      default:
        this.patientList = this.patientService.patientList;
    }
  }
}
