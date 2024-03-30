import { Component, OnInit } from '@angular/core';
import { ApiService } from './common/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'authorization';

  constructor(private authService: ApiService) { }

  ngOnInit(): void {
    // this.login();
  }

  login() {
    // this.authService.login('admin@deepersignals.com', 'password').subscribe(
    this.authService.login('user@deepersignals.com', 'password').subscribe(
      response => {
        console.log('Login successful:', response);
        this.requst();

        // Обробка відповіді API
      },
      error => {
        console.error('Login failed:', error);
        // Обробка помилки
      }
    );
  }


  requst() {
    this.authService.requestWithAuthorization('GET', 'userassessments').subscribe(
      res => {
        console.log(res);
      }
    )
  }
}
