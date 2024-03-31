import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const URL: string = 'https://user-assessment-api.vercel.app/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _token: string = '';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('auth_token') ?? '';
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
    localStorage.setItem('auth_token', value);
  }

  public login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${URL}login`, { email, password }).pipe(tap(res => this.token = res.token));
  }

  public getDashboard(): Observable<Object> {
    return this.requestWithAuthorization('GET', 'userassessments');
  }

  public getUserAssessmentGraph(id: number): Observable<Object> {
    return this.requestWithAuthorization('GET', `userassessments/graph?id=${id}`);
  }

  private requestWithAuthorization(method: string, endpoint: string, body?: any): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Token': this.token
    });
    return this.http.request(method, `${URL}${endpoint}`, { headers, body });
  }
}