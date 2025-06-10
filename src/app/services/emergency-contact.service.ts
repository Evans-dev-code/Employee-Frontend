import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {
  private baseUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getContacts(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${employeeId}/contacts`);
  }

  addContact(employeeId: number, contact: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${employeeId}/contacts`, contact);
  }

  updateContact(employeeId: number, contactId: number, contact: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${employeeId}/contacts/${contactId}`, contact);
  }

  deleteContact(employeeId: number, contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${employeeId}/contacts/${contactId}`);
  }
}
