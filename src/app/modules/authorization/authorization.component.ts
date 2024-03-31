import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnDestroy {
  subscription!: Subscription;

  constructor(private authService: ApiService) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onSubmit(tempForm: NgForm): void {
    this.subscription = this.authService.login(tempForm.value.email, tempForm.value.password).subscribe();
  }

  user = 'user@deepersignals.com'
  admin = 'admin@deepersignals.com'
  pass = 'password'

}
