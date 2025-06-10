import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PerformanceReview {
  id?: number;
  reviewer: string;
  reviewDate: string;
  score: number;
  comments: string;
  nextReviewDate: string;
  employeeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceReviewService {
  private baseUrl = 'http://localhost:8080/api/performance-reviews';

  constructor(private http: HttpClient) {}

  getReviewsByEmployeeId(employeeId: number): Observable<PerformanceReview[]> {
    return this.http.get<PerformanceReview[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  createReview(review: PerformanceReview): Observable<PerformanceReview> {
    return this.http.post<PerformanceReview>(this.baseUrl, review);
  }

  updateReview(id: number, review: PerformanceReview): Observable<PerformanceReview> {
    return this.http.put<PerformanceReview>(`${this.baseUrl}/${id}`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
