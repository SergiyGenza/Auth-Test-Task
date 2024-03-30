import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: Observable<any>

  constructor(private apiService: ApiService) {
    this.data = apiService.getDashboard();
    // this.data = apiService.getDashboard('GET', 'userassessments');

  }

  ngOnInit(): void {
    this.requst();
  }

  requst() {
    // this.apiService.getDashboard('GET', 'userassessments').subscribe(
    this.apiService.getDashboard().subscribe(
      res => {
        console.log(res);
      }
    )
  }

  getGraph(id: number) {
    this.apiService.getUserAssessmentGraph(id).subscribe(res => console.log(res)
    )
  }

}
