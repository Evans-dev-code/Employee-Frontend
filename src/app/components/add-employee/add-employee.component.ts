import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from 'src/app/services/employee.service';
import { PositionService, Position } from 'src/app/services/position.service';
import { DepartmentService, Department } from 'src/app/services/department.service';
import { Router } from '@angular/router';

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
    positionId: 0
  };

  departments: Department[] = [];
  positions: Position[] = [];

  selectedDepartmentId: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
      if (this.departments.length > 0) {
        this.selectedDepartmentId = this.departments[0].id;
        this.loadPositions(this.selectedDepartmentId);
      }
    });
  }

  loadPositions(departmentId: number): void {
    this.positionService.getPositionsByDepartment(departmentId).subscribe(data => {
      this.positions = data;
      if (this.positions.length > 0) {
        this.employee.positionId = this.positions[0].id;
      } else {
        this.employee.positionId = 0; // no position selected
      }
    });
  }

  onDepartmentChange(): void {
    this.loadPositions(this.selectedDepartmentId);
  }

  onSubmit(): void {
    if(this.employee.positionId === 0) {
      alert('Please select a valid position.');
      return;
    }
    this.employeeService.addEmployee(this.employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}
