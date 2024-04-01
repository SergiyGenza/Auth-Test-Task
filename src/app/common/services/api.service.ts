import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserProfile } from '../models/usersProfile.model';
import { User } from '../models/user.model';

const URL: string = 'https://user-assessment-api.vercel.app/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly USER_KEY = 'user';
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const userJson = sessionStorage.getItem(this.USER_KEY);
    if (userJson) {
      this.userSubject.next(JSON.parse(userJson));
    }
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  get user(): User | null {
    return this.userSubject.value;
  }

  set user(value: User | null) {
    this.userSubject.next(value);
    if (value) {
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(this.USER_KEY);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.user;
  }

  public signOut(): void {
    this.user = null;
    this.router.navigate(['/login'])
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${URL}login`, { email, password })
      .pipe(tap(user => {
        this.user = user;
        this.router.navigate(['/dashboard']);
      }));
  }

  public getDashboard(): Observable<Object> {
    return this.requestWithAuthorization('GET', 'userassessments');
  }

  public getUsersAssessmentGraph(id: number): Observable<Object> {
    return this.requestWithAuthorization('GET', `userassessments/graph?id=${id}`);
  }

  public isAdmin(): boolean {
    return this.user?.role === 'Admin';
  }

  public getAdminSection(): Observable<UserProfile[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Token': this.user?.token ?? ''
    });
    return this.http.get<UserProfile[]>(`${URL}users`, { headers });
  }

  private requestWithAuthorization(method: string, endpoint: string, body?: any): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Token': this.user?.token ?? ''
    });
    return this.http.request(method, `${URL}${endpoint}`, { headers, body });
  }
}
