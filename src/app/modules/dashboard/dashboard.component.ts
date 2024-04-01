import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  data: Observable<any>
  graphData!: any;
  subscription!: Subscription | undefined;
  isAdmin: boolean;

  constructor(private apiService: ApiService) {
    this.data = apiService.getDashboard();
    this.isAdmin = apiService.isAdmin();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getGraph(id: number): void {
    this.subscription = this.apiService.getUsersAssessmentGraph(id)
      .subscribe(res => this.graphData = res);
  }

  public onSignOut(): void {
    this.apiService.signOut();
  }
}
