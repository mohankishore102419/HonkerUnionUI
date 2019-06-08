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
  lat:any;
  lng:any;
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
      contactNumber: '',
      lat: '',
      lng:''
    }
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  onSubmit(form: NgForm) {
    debugger;
    if (form.value.id == null) {
      form.value.lat = this.lat;
      form.value.lng = this.lng;
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
