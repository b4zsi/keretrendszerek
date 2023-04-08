import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    ShopComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatCardModule,
    MatListModule
  ]
})
export class ShopModule { }
