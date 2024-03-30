import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const URL: string = 'https://user-assessment-api.vercel.app/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(this.TOKEN_KEY) ?? '';
  }

  private _token!: string;

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
    localStorage.setItem(this.TOKEN_KEY, value);
  }

  public login(email: string, password: string) {
    return this.http.post<{ token: string }>(URL + 'login', { email, password }).pipe(tap((res) => {
      this.token = res.token
    }));
  }

  public requestWithAuthorization(method: string, reqUrl: string, body?: any): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Token': this.token
    });
    return this.http.request(method, URL + reqUrl, { headers, body });
  }
  public getDashboard(body?: any): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Token': this.token
    });
    return this.http.request('GET', URL + 'userassessments', { headers, body });
  }

  public getUserAssessmentGraph(id: number) {
    // Формуємо URL для запиту, додаючи параметр id
    const endpoint = `userassessments/graph?id=${id}`;

    // Виконуємо GET запит за допомогою методу requestWithAuthorization
    return this.requestWithAuthorization('GET', endpoint);
  }
}