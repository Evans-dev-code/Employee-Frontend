import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Education {
  id: number;
  degreeName: string;
  institution: string;
  graduationYear: number;
  fileDownloadUrl: string;
  uploadedAt: string;
  employeeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private baseUrl = 'http://localhost:8080/api/education';

  constructor(private http: HttpClient) {}

  uploadEducation(
    employeeId: number,
    degreeName: string,
    institution: string,
    graduationYear: number,
    file: File
  ): Observable<Education> {
    const formData = new FormData();
    formData.append('employeeId', employeeId.toString());
    formData.append('degreeName', degreeName);
    formData.append('institution', institution);
    formData.append('graduationYear', graduationYear.toString());
    formData.append('file', file);

    return this.http.post<Education>(`${this.baseUrl}/upload`, formData);
  }

  // ✅ Fetch multiple education records by employee
  getEducationByEmployee(employeeId: number): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  updateEducation(
    id: number,
    degreeName: string,
    institution: string,
    graduationYear: number,
    file?: File
  ): Observable<Education> {
    const formData = new FormData();
    formData.append('degreeName', degreeName);
    formData.append('institution', institution);
    formData.append('graduationYear', graduationYear.toString());
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<Education>(`${this.baseUrl}/${id}`, formData);
  }

  deleteEducation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  }
}
