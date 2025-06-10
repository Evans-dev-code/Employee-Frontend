import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WorkHistory {
  id?: number;
  employeeId: number;
  companyName: string;
  positionTitle: string;
  startDate: string;
  endDate?: string;
  responsibilities: string;
  location: string;
  employmentType: string;
  supervisorName?: string;
  supervisorContact?: string;
  reasonForLeaving?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkHistoryService {

  private apiUrl = 'http://localhost:8080/api/work-history';

  constructor(private http: HttpClient) {}

  getByEmployeeId(employeeId: number): Observable<WorkHistory[]> {
    return this.http.get<WorkHistory[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  add(work: WorkHistory): Observable<WorkHistory> {
    return this.http.post<WorkHistory>(this.apiUrl, work);
  }

  update(id: number, work: WorkHistory): Observable<WorkHistory> {
    return this.http.put<WorkHistory>(`${this.apiUrl}/${id}`, work);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
