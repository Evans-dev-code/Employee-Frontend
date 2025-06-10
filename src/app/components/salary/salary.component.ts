import { Component, OnInit } from '@angular/core';
import { SalaryDTO, SalaryService } from '../../services/salary.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  employeeId!: number;
  salaryHistory: SalaryDTO[] = [];
  currentSalaryForm!: FormGroup;
  selectedRecordId?: number;
  formVisible = false;

  constructor(
    private salaryService: SalaryService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // ✅ Robust param handling: works for both /salary/:employeeId and /employee-profile/:id/salary
    const idFromParam = this.route.snapshot.paramMap.get('employeeId');
    const fallbackId = this.route.parent?.snapshot.paramMap.get('id');

    this.employeeId = +(idFromParam ?? fallbackId)!;

    if (!this.employeeId || isNaN(this.employeeId)) {
      console.error('Invalid employee ID');
      return;
    }

    console.log('Using employeeId:', this.employeeId);
    this.loadSalaryHistory();
    this.initForm();
  }

  loadSalaryHistory(): void {
    this.salaryService.getSalaryHistoryByEmployeeId(this.employeeId).subscribe({
      next: (data: SalaryDTO[]) => {
        this.salaryHistory = data;
      },
      error: (err: any) => console.error('Failed to fetch salary history', err)
    });
  }

  initForm(): void {
    this.currentSalaryForm = this.fb.group({
      baseSalary: [null, [Validators.required, Validators.min(0.01)]],
      bonus: [0, [Validators.required, Validators.min(0)]],
      tax: [0, [Validators.required, Validators.min(0)]],
      effectiveDate: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  showForm(salary?: SalaryDTO): void {
    this.formVisible = true;
    this.initForm();

    if (salary) {
      this.selectedRecordId = salary.id;
      this.currentSalaryForm.patchValue(salary);
    } else {
      this.selectedRecordId = undefined;
    }
  }

  saveSalary(): void {
    const formValue = this.currentSalaryForm.value as SalaryDTO;
    formValue.employeeId = this.employeeId;

    if (this.selectedRecordId) {
      this.salaryService.updateSalary(this.selectedRecordId, formValue).subscribe({
        next: () => {
          this.loadSalaryHistory();
          this.formVisible = false;
        },
        error: (err: any) => console.error('Update failed', err)
      });
    } else {
      this.salaryService.createSalary(formValue).subscribe({
        next: () => {
          this.loadSalaryHistory();
          this.formVisible = false;
        },
        error: (err: any) => console.error('Create failed', err)
      });
    }
  }

  cancel(): void {
    this.formVisible = false;
    this.selectedRecordId = undefined;
    this.currentSalaryForm.reset();
  }

  isCurrentMonth(dateString: string): boolean {
    const inputDate = new Date(dateString);
    const now = new Date();
    return inputDate.getMonth() === now.getMonth() && inputDate.getFullYear() === now.getFullYear();
  }
}
