import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    emailId: '',
    departmentId: 0 // add departmentId
  };

  departments: any[] = [];

  constructor(private employeeService: EmployeeService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    
    this.http.get<any[]>('http://localhost:8080/api/departments')
      .subscribe(data => this.departments = data);
  }

  onSubmit(): void {
    this.employeeService.addEmployee(this.employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}
