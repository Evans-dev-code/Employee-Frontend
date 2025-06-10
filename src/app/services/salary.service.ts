import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalaryDTO {
  id?: number;
  employeeId: number;
  baseSalary: number;
  bonus: number;
  tax: number;
  effectiveDate: string;
  netSalary?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private readonly apiUrl = 'http://localhost:8080/api/salaries';

  constructor(private http: HttpClient) {}

  getAllSalaries(): Observable<SalaryDTO[]> {
    return this.http.get<SalaryDTO[]>(this.apiUrl);
  }

  getSalaryById(id: number): Observable<SalaryDTO> {
    return this.http.get<SalaryDTO>(`${this.apiUrl}/${id}`);
  }

  getSalaryHistoryByEmployeeId(employeeId: number): Observable<SalaryDTO[]> {
    return this.http.get<SalaryDTO[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  createSalary(data: SalaryDTO): Observable<SalaryDTO> {
    return this.http.post<SalaryDTO>(this.apiUrl, data);
  }

  updateSalary(id: number, data: SalaryDTO): Observable<SalaryDTO> {
    return this.http.put<SalaryDTO>(`${this.apiUrl}/${id}`, data);
  }
}
