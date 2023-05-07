import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendelesekRoutingModule } from './rendelesek-routing.module';
import { RendelesekComponent } from './rendelesek.component';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from 'src/app/shared/pipes/date-pipe.pipe';


@NgModule({
  declarations: [
    RendelesekComponent,
    DatePipe
  ],
  imports: [
    CommonModule,
    RendelesekRoutingModule,
    MatTableModule
  ]
})
export class RendelesekModule { }
