import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EducationService, Education } from '../../services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  employeeId!: number;
  educations: Education[] = [];
  selectedEducation?: Education;
  file!: File;
  form: any = {
    degreeName: '',
    institution: '',
    graduationYear: ''
  };
  loading = false;
  message = '';
  editing = false;
  formVisible = false;

  constructor(
    private route: ActivatedRoute,
    private educationService: EducationService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.employeeId = +params['id'];
      this.loadEducation();
    });
  }

  loadEducation() {
    this.educationService.getEducationByEmployee(this.employeeId).subscribe({
      next: (data) => {
        this.educations = data;
        if (data.length > 0) {
          this.selectedEducation = data[0];
          this.editing = true;
          this.form.degreeName = this.selectedEducation.degreeName;
          this.form.institution = this.selectedEducation.institution;
          this.form.graduationYear = this.selectedEducation.graduationYear;
        } else {
          this.selectedEducation = undefined;
          this.editing = false;
        }
      },
      error: () => {
        this.educations = [];
        this.editing = false;
      }
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (!this.file && !this.editing) {
      this.message = 'Please select a file.';
      return;
    }

    this.loading = true;

    const upload$ = this.editing && this.selectedEducation
      ? this.educationService.updateEducation(
          this.selectedEducation.id,
          this.form.degreeName,
          this.form.institution,
          this.form.graduationYear,
          this.file
        )
      : this.educationService.uploadEducation(
          this.employeeId,
          this.form.degreeName,
          this.form.institution,
          this.form.graduationYear,
          this.file
        );

    upload$.subscribe({
      next: () => {
        this.message = this.editing ? 'Updated successfully!' : 'Uploaded successfully!';
        this.loading = false;
        this.formVisible = false;
        this.loadEducation(); // Reload list after upload
      },
      error: (err) => {
        this.message = err.error || 'Something went wrong.';
        this.loading = false;
      }
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this education record?')) {
      this.educationService.deleteEducation(id).subscribe(() => {
        this.message = 'Deleted successfully.';
        this.form = { degreeName: '', institution: '', graduationYear: '' };
        this.editing = false;
        this.loadEducation(); // Refresh list
      });
    }
  }

  download(id: number) {
    this.educationService.downloadFile(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'education_file.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  showEdit(edu: Education) {
    this.selectedEducation = edu;
    this.form.degreeName = edu.degreeName;
    this.form.institution = edu.institution;
    this.form.graduationYear = edu.graduationYear;
    this.editing = true;
    this.formVisible = true;
  }
}
