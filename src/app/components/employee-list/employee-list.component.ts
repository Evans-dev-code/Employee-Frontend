import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EmployeeService, Employee } from '../../services/employee.service';
import { DepartmentService, Department } from '../../services/department.service';
import { PositionService, Position } from '../../services/position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  departments: Department[] = [];
  positions: Position[] = [];
  selectedDepartment: string = '';

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    forkJoin({
      employees: this.employeeService.getEmployees(),
      departments: this.departmentService.getDepartments(),
      positions: this.positionService.getAllPositions()
    }).subscribe(({ employees, departments, positions }) => {
      this.departments = departments;
      this.positions = positions;

      // Map employees with position and department names
      this.employees = employees.map(emp => {
        const position = this.positions.find(pos => pos.id === emp.positionId);
        const department = this.departments.find(dept => dept.id === position?.departmentId);
        return {
          ...emp,
          positionName: position?.title || 'N/A',
          departmentName: department?.name || 'N/A'
        };
      });

      this.filteredEmployees = [...this.employees];
    });
  }

  filterEmployees(): void {
    if (this.selectedDepartment) {
      this.filteredEmployees = this.employees.filter(emp => emp.departmentName === this.selectedDepartment);
    } else {
      this.filteredEmployees = [...this.employees];
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.ngOnInit(); // Refresh list after deletion
      });
    }
  }

  updateEmployee(id: number): void {
    this.router.navigate(['/update-employee', id]);
  }

  viewSalary(employeeId: number): void {
  this.router.navigate(['/salary', employeeId]);
}

viewProfile(id: number): void {
  this.router.navigate(['/employee-profile', id]);
}

onActionSelect(action: string, employeeId: number): void {
  switch (action) {
    case 'profile':
      this.viewProfile(employeeId);
      break;
    case 'update':
      this.updateEmployee(employeeId);
      break;
    case 'delete':
      this.deleteEmployee(employeeId);
      break;
  }
}

}
