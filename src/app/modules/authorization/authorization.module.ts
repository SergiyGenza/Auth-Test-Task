import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationRoutingModule } from './authorization.routing.module';
import { FormsModule } from '@angular/forms';
import { AuthorizationComponent } from './authorization.component';



@NgModule({
  declarations: [
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule                    
  ]
})
export class AuthorizationModule { }
