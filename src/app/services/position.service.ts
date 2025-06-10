import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Position {
  id: number;
  title: string;
  departmentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private baseUrl = 'http://localhost:8080/api/positions';

  constructor(private http: HttpClient) {}

  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.baseUrl);
  }

  getPositionsByDepartment(deptId: number): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.baseUrl}/by-department/${deptId}`);
  }
}
