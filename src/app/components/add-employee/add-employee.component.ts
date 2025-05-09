import { Component } from '@angular/core';
import { EmployeeService, Employee } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    emailId: ''
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit(): void {
    this.employeeService.addEmployee(this.employee).subscribe(() => {
      this.router.navigate(['/employees']); // redirect to employee list
    });
  }
}
