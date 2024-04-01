import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(): boolean {
    return this.apiService.isAuthenticated() && this.apiService.user?.role === 'Admin' ? true : (this.router.navigate(['dashboard']), false);
  }
}
