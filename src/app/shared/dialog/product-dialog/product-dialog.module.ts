import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDialogRoutingModule } from './product-dialog-routing.module';
import { ProductDialogComponent } from './product-dialog.component';
import {MatDialogModule} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


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
    MatButtonModule
  ],
  entryComponents:[
    ProductDialogComponent
  ]
})
export class ProductDialogModule { }
