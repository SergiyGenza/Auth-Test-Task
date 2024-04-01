import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from 'src/app/common/models/usersProfile.model';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  userProfiles!: Observable<UserProfile[]>;

  constructor(private apiService: ApiService) {
    this.userProfiles = this.apiService.getAdminSection();
  }
}
