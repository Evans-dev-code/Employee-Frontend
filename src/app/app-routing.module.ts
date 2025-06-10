import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { SalaryComponent } from './components/salary/salary.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EducationComponent } from './components/education/education.component';
import { EmergencyContactComponent } from './components/emergency-contact/emergency-contact.component';
import { WorkHistoryComponent } from './components/work-history/work-history.component';
import { SkillComponent } from './components/skill/skill.component';
import { PerformanceReviewComponent } from './components/performance-review/performance-review.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthRedirectGuard] },
  { path: 'employees', component: ListEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'salary/:employeeId', component: SalaryComponent, canActivate: [AuthGuard] },

  {
    path: 'employee-profile/:id',
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'education', pathMatch: 'full' },
      { path: 'education', component: EducationComponent },
      { path: 'salary', component: SalaryComponent },
      { path: 'emergencycontact', component: EmergencyContactComponent },
      { path: 'workhistory', component: WorkHistoryComponent },
      { path: 'skill', component: SkillComponent },
      { path: 'performancereview', component: PerformanceReviewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
