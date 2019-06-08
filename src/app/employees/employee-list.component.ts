import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service'
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employess: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    const employeeObservable = this.employeeService.getEmployeeList();
    employeeObservable.subscribe((data: Employee[]) => {
      this.employeeService.employeeList = data;
        });
  }
 
  showForEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }
 
 
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(id)
      .subscribe(x => {
        const employeeObservable = this.employeeService.getEmployeeList();
        employeeObservable.subscribe((data: Employee[]) => {
        this.employeeService.employeeList = data;
        alert("Deleted Successfully");
        });
      })
    }
  }

}
