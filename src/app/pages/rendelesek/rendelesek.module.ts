import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendelesekRoutingModule } from './rendelesek-routing.module';
import { RendelesekComponent } from './rendelesek.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    RendelesekComponent
  ],
  imports: [
    CommonModule,
    RendelesekRoutingModule,
    MatTableModule
  ]
})
export class RendelesekModule { }
