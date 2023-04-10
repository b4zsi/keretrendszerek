import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonModule
  ]
})
export class MainModule { }
