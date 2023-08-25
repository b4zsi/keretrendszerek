import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'
import { CartRoutingModule } from '../cart/cart-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatCardModule,
    MatListModule,
    CartRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ]
})
export class ShopModule { }
