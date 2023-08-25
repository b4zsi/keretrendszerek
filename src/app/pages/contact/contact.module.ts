import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,

  ]
})
export class ContactModule { }
