import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkHistory, WorkHistoryService } from 'src/app/services/work-history.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.scss']
})
export class WorkHistoryComponent implements OnInit {

  employeeId!: number;
  workHistoryList: WorkHistory[] = [];
  formVisible = false;
  isEdit = false;
  currentEditId?: number;

  workForm: FormGroup = this.fb.group({
    companyName: ['', Validators.required],
    positionTitle: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    responsibilities: ['', Validators.required],
    location: ['', Validators.required],
    employmentType: ['', Validators.required],
    supervisorName: [''],
    supervisorContact: [''],
    reasonForLeaving: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private workHistoryService: WorkHistoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.employeeId = +params['id'];
      this.loadWorkHistory();
    });
  }

  loadWorkHistory(): void {
    this.workHistoryService.getByEmployeeId(this.employeeId).subscribe({
      next: (data) => this.workHistoryList = data,
      error: (err) => console.error('Error loading work history:', err)
    });
  }

  showForm(editItem?: WorkHistory): void {
    this.formVisible = true;
    this.isEdit = !!editItem;

    if (editItem) {
      this.currentEditId = editItem.id;
      this.workForm.patchValue(editItem);
    } else {
      this.currentEditId = undefined;
      this.workForm.reset();
    }
  }

  hideForm(): void {
    this.formVisible = false;
    this.workForm.reset();
    this.currentEditId = undefined;
    this.isEdit = false;
  }

  submitForm(): void {
    if (this.workForm.invalid) return;

    const payload: WorkHistory = {
      ...this.workForm.value,
      employeeId: this.employeeId
    };

    const request = this.isEdit && this.currentEditId
      ? this.workHistoryService.update(this.currentEditId, payload)
      : this.workHistoryService.add(payload);

    request.subscribe({
      next: () => {
        this.loadWorkHistory();
        this.hideForm();
      },
      error: (err) => console.error('Save failed:', err)
    });
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.workHistoryService.delete(id).subscribe(() => {
        this.loadWorkHistory();
      });
    }
  }
}
