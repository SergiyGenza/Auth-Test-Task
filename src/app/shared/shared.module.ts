import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    GraphComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GraphComponent,
    CardComponent
  ]
})
export class SharedModule { }
