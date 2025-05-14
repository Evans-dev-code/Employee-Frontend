import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  departments: string[] = [];
  selectedDepartment: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data;
      this.departments = [...new Set(data.map(emp => emp.departmentName).filter((name): name is string => !!name))];
    });
  }

  filterEmployees(): void {
    if (this.selectedDepartment) {
      this.filteredEmployees = this.employees.filter(
        emp => emp.departmentName === this.selectedDepartment
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  updateEmployee(id: number): void {
    this.router.navigate(['/update-employee', id]);
  }
}

