import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TypeOfTreatment } from '../shared/employee.model';

@Component({
  selector: 'app-emergency-medical-info',
  templateUrl: './emergency-medical-info.component.html',
  styleUrls: ['./emergency-medical-info.component.css']
})
export class EmergencyMedicalInfoComponent implements OnInit {
  typeOfTreatmentList: [
    { name: "GENERAL", id: 1 }, 
    { name: "PEDIATRIC", id: 2 },
    { name: "CARDIOLOGY", id: 3 },
    { name: "NEUROLOGY", id: 4 },
    { name: "STROKE", id: 5 }];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private emergencyService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    const employeeObservable = this.emergencyService.getTypeOfTreatmentList();
    employeeObservable.subscribe((data: TypeOfTreatment[]) => {
      debugger;
      this.emergencyService.typeOfTreatmentList = data;
        });
  }
 
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.emergencyService.selectedUser = {
      id: null,
      name: '',
      age: '',
      typeOfTreatment: 'null',
      history: '',
      contactNumber: ''
    }
  }

  onSubmit(form: NgForm) {
    debugger;
    if (form.value.id == null) {
      this.emergencyService.postUser(form.value)
      .subscribe(data => {
        this.resetForm(form);
        alert('New Record Added Succcessfully');
        this.router.navigate(['/list']);
      });
    }
    else {
      this.emergencyService.putEmployee(form.value.id, form.value)
      .subscribe(data => {
        this.resetForm(form);
        alert('Record Updated Successfully!');
      
      });
    }
  }

}
