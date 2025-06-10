import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Skill {
  id?: number;
  employeeId: number;
  name: string;
  proficiencyLevel: string;
  yearsOfExperience: number;
  certified: boolean;
  certificationName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = 'http://localhost:8080/api/skills';

  constructor(private http: HttpClient) {}

  getByEmployeeId(employeeId: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  add(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill);
  }

  update(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
