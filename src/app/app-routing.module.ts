import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthRedirectGuard] },
  { path: 'employees', component: ListEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmployeeComponent,canActivate: [AuthGuard] },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
