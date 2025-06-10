import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';
import { ListEmployeesComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SignupComponent } from './signup/signup.component';
import { PositionService } from './services/position.service';
import { SalaryComponent } from './components/salary/salary.component';
import { SalaryService } from './services/salary.service';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EducationComponent } from './components/education/education.component';
import { EducationService } from './services/education.service';
import { EmergencyContactComponent } from './components/emergency-contact/emergency-contact.component';
import { EmergencyContactService } from './services/emergency-contact.service';
import { WorkHistoryComponent } from './components/work-history/work-history.component';
import { WorkHistoryService } from './services/work-history.service';
import { SkillComponent } from './components/skill/skill.component';
import { SkillService } from './services/skill.service';
import { PerformanceReviewComponent } from './components/performance-review/performance-review.component';
import { PerformanceReviewService } from './services/performance-review.service';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    LoginComponent,
    SignupComponent,
    SalaryComponent,
    EmployeeProfileComponent,
    EducationComponent,
    EmergencyContactComponent,
    WorkHistoryComponent,
    SkillComponent,
    PerformanceReviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [EmployeeService, SalaryService, PositionService, DepartmentService, AuthService, EducationService, EmergencyContactService, WorkHistoryService, SkillService, PerformanceReviewService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}
