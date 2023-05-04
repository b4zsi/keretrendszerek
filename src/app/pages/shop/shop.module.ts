import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import {MatListModule} from '@angular/material/list';
import { CartModule } from '../cart/cart.module';
import {MatButtonModule} from '@angular/material/button'
import { CartRoutingModule } from '../cart/cart-routing.module';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

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
  ]
})
export class ShopModule { }
