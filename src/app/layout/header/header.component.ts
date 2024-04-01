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
  isAdmin: boolean;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    this.isAdmin = apiService.isAdmin();
  }

  ngOnInit(): void {
    this.getRoute();
  }

  public onSignOut(): void {
    this.apiService.signOut();
  }

  private getRoute(): void {
    this.router.events.subscribe(() => {
      this.url = this.router.url
    });
  }
}
