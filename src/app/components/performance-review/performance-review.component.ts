import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceReview, PerformanceReviewService } from 'src/app/services/performance-review.service';

@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.scss']
})
export class PerformanceReviewComponent implements OnInit {
  employeeId!: number;
  reviews: PerformanceReview[] = [];

  form: PerformanceReview = this.initEmptyReview();
  editing: boolean = false;
  showForm: boolean = false;  // Controls form visibility

  constructor(
    private reviewService: PerformanceReviewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id;
        this.loadReviews();
      }
    });
  }

  initEmptyReview(): PerformanceReview {
    return {
      reviewer: '',
      reviewDate: '',
      score: 0,
      comments: '',
      nextReviewDate: '',
      employeeId: this.employeeId
    };
  }

  loadReviews(): void {
    this.reviewService.getReviewsByEmployeeId(this.employeeId).subscribe({
      next: (data) => {
        this.reviews = data;
        // Hide form if there are reviews and not editing
        this.showForm = this.editing ? true : this.reviews.length === 0;
      },
      error: (err) => console.error('Error loading reviews:', err)
    });
  }

  openAddForm(): void {
    this.form = this.initEmptyReview();
    this.editing = false;
    this.showForm = true;
  }

  saveReview(): void {
    if (this.editing && this.form.id) {
      this.reviewService.updateReview(this.form.id, this.form).subscribe(() => {
        this.cancelEdit();
        this.loadReviews();
      });
    } else {
      this.form.employeeId = this.employeeId;
      this.reviewService.createReview(this.form).subscribe(() => {
        this.form = this.initEmptyReview();
        this.showForm = false;
        this.loadReviews();
      });
    }
  }

  editReview(review: PerformanceReview): void {
    this.form = { ...review };
    this.editing = true;
    this.showForm = true;
  }

  cancelEdit(): void {
    this.form = this.initEmptyReview();
    this.editing = false;
    this.showForm = false;
  }

  deleteReview(id: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(id).subscribe(() => {
        this.loadReviews();
      });
    }
  }
}
