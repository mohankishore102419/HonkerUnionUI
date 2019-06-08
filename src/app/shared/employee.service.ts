import { Injectable } from '@angular/core';
// Import HttpClient service
import { HttpClient,HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { Employee, EmergencyUser, TypeOfTreatment } from './employee.model';
import {Observable,throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee : Employee;
  selectedUser: EmergencyUser;
  typeOfTreatment: TypeOfTreatment;
  employeeList : Employee[];
  typeOfTreatmentList: TypeOfTreatment[];
  baseUrl = 'http://localhost:3000/employees';
  constructor(private httpClient: HttpClient) {
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return throwError('There is a problem with the service.We are notified & working on it. Please try again later.');
}

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  getTypeOfTreatmentList(): Observable<TypeOfTreatment[]> {
    return this.httpClient.get<TypeOfTreatment[]>("http://localhost:3000/typeOfTreatments");
  }


  postEmployee(employee : Employee) : Observable<void>{
    var data = JSON.stringify(employee);
    return this.httpClient.post<void>(this.baseUrl,
      data, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            })
            .pipe(catchError(this.handleError));
  }

  postUser(user : EmergencyUser) : Observable<void>{
    var data = JSON.stringify(user);
    return this.httpClient.post<void>("http://localhost:3000/typeOfTreatments",
      data, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            })
            .pipe(catchError(this.handleError));
  }

  putEmployee(id, employee: Employee) : Observable<void> {
    // We are using the put() method to issue a PUT request
    // We are using template literal syntax to build the url to which
    // the request must be issued. To the base URL we are appending
    // id of the employee we want to update. In addition to the URL,
    // we also pass the updated employee object, and Content-Type header
    // as parameters to the PUT method
    var data = JSON.stringify(employee);
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, data, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
    .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
}

}
