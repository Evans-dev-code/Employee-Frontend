import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from 'src/app/services/employee.service';
import { DepartmentService, Department } from 'src/app/services/department.service';
import { PositionService, Position } from 'src/app/services/position.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  id!: number;

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    emailId: '',
    positionId: 0,
    departmentId: 0
  };

  departments: Department[] = [];
  positions: Position[] = [];

  selectedDepartmentId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Load departments first
    this.departmentService.getDepartments().subscribe((data: Department[]) => {
      this.departments = data;

      // Then load employee data
      this.employeeService.getEmployeeById(this.id).subscribe((emp: Employee) => {
        this.employee = emp;

        if (emp.departmentId) {
          this.selectedDepartmentId = emp.departmentId;

          // Load positions for selected department and select employee's position
          this.loadPositionsAndSelect(emp.positionId || 0);
        }
      });
    });
  }

  onDepartmentChange(): void {
    if (this.selectedDepartmentId) {
      this.positionService.getPositionsByDepartment(this.selectedDepartmentId).subscribe((positions: Position[]) => {
        this.positions = positions;

        // Reset employee's positionId if it's not in the new positions list
        if (!this.positions.find(pos => pos.id === this.employee.positionId)) {
          this.employee.positionId = 0;
        }
      });
    } else {
      this.positions = [];
      this.employee.positionId = 0;
    }
  }

  loadPositionsAndSelect(selectedPositionId: number): void {
    this.positionService.getPositionsByDepartment(this.selectedDepartmentId).subscribe((positions: Position[]) => {
      this.positions = positions;
      this.employee.positionId = selectedPositionId;
    });
  }

  onUpdate(): void {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}
