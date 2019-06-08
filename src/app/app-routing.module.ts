import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list.component';
import { EmployeeComponent } from './employees/employee.component';
import { EmergencyMedicalInfoComponent} from './emergency-medical-info/emergency-medical-info.component'

const routes: Routes = [{ path: 'list', component: EmployeeListComponent },
{ path: 'create', component: EmployeeComponent },
{ path: 'home', component: EmergencyMedicalInfoComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { } 
 
