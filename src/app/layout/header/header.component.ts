import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  url!: string;
  isAdmin: boolean = false;
  isAuthorized: boolean = false;

  constructor(
    public router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getRoute();
    this.getUser();
  }

  public onSignOut(): void {
    this.apiService.signOut();
  }

  private getRoute(): void {
    this.router.events.subscribe(() => {
      this.url = this.router.url;
    });
  }

  private getUser() {
    this.apiService.user$.subscribe(user => {
      this.isAuthorized = !!user;
      this.isAdmin = user ? user.role === 'Admin' : false;
    });
  }
}
