import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from 'src/app/services/employee.service';
import { DepartmentService } from 'src/app/services/department.service'; // Import the DepartmentService

interface Department {
  id: number;
  name: string;
}


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
    departmentId: 0 // Adding departmentId here
  };

  departments: Department[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch employee info
    this.employeeService.getEmployeeById(this.id).subscribe((data) => {
      this.employee = data;
    });

    this.departmentService.getDepartments().subscribe((data: any[]) => {
  this.departments = data;
});

  }

  onUpdate(): void {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(() => {
      this.router.navigate(['/employees']); // Navigate back to employee list
    });
  }
}
