import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnDestroy {
  subscription!: Subscription;

  constructor(
    private authService: ApiService,
    private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onSubmit(tempForm: NgForm): void {
    this.subscription = this.authService.login(tempForm.value.email, tempForm.value.password).subscribe(
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
