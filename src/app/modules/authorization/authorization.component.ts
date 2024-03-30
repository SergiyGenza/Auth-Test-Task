import { Component } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {

  constructor(
    private authService: ApiService,
    private router: Router) {

  }

  onSubmit(tempForm: NgForm) {
    this.authService.login(tempForm.value.email, tempForm.value.password).subscribe(
      response => {
        console.log('Login successful:', response);
        this.router.navigate(['dashboard']);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  user = 'user@deepersignals.com'
  admin = 'admin@deepersignals.com'
  pass = 'password'

}
