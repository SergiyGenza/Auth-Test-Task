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

  constructor(private apiService: ApiService) {
    this.data = apiService.getDashboard();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getDataForGraph(id: number, title: string): void {
    this.subscription = this.apiService.getUsersAssessmentGraph(id)
      .subscribe({
        next: (res) => {
          this.graphData = {
            data: res,
            title: title
          };
        },
        error: (error) => {
          console.error('Error fetching graph data', error);
        }
      });
  }
}
