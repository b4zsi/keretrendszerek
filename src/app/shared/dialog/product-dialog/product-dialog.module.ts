import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDialogRoutingModule } from './product-dialog-routing.module';
import { ProductDialogComponent } from './product-dialog.component';
import {MatDialogModule} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    ProductDialogRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule

  ],
  entryComponents:[
    ProductDialogComponent
  ]
})
export class ProductDialogModule { }
