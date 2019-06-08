import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  lat:any;
  lng:any;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  
 
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      id: null,
      firstName: '',
      lastName: '',
      empCode: '',
      position: '',
      office: ''
    }
  }

    onSubmit(form: NgForm) {
      if (form.value.id == null) {
        debugger;
        this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList().subscribe(data =>{
            this.employeeService.employeeList = data;
            alert('New Record Added Succcessfully');
          }
          );
        });
      }
      else {
        debugger;
        this.employeeService.putEmployee(form.value.id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList().subscribe(data =>{
            this.employeeService.employeeList = data;
            alert('Record Updated Successfully!');
          }
          );;
        
        });
      }
    }
  
  }

